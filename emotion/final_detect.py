from keras.models import load_model
# from time import sleep
import requests
import json
from numpy import savetxt
from tensorflow.keras.utils import img_to_array
from keras.preprocessing import image
import cv2
import numpy as np
from flask import Flask, render_template, Response
import os
from pygame import mixer


mixer.init()
sound = mixer.Sound('emotion/alarm.wav')

leye = cv2.CascadeClassifier('emotion\haar cascade files\haarcascade_lefteye_2splits.xml')
reye = cv2.CascadeClassifier('emotion\haar cascade files\haarcascade_righteye_2splits.xml')
face_classifier = cv2.CascadeClassifier('emotion\haar cascade files\haarcascade_frontalface_alt.xml')



lbl=['Close','Open']
arr = []

model = load_model('emotion/models/cnncat2.h5')
path = os.getcwd()
cap = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_COMPLEX_SMALL
count=0

score = 0
global thicc
rpred=[99]
lpred=[99]

face_classifier = cv2.CascadeClassifier(r'emotion/haarcascade_frontalface_default.xml')
classifier =load_model(r'emotion/models/model.h5')

emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
app=Flask(__name__)
# cap = cv2.VideoCapture(0)


def gen_frames():
   while True:
     ret, frame = cap.read()
    #  height,width = frame.shape[:2]
    #  labels = []
     gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
     faces = face_classifier.detectMultiScale(gray)

     for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,255),2)
        roi_gray = gray[y:y+h,x:x+w]
        roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)



        if np.sum([roi_gray])!=0:
            roi = roi_gray.astype('float')/255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi,axis=0)

            prediction = classifier.predict(roi)[0]
            label=emotion_labels[prediction.argmax()]
            label_position = (x,y)
            # cv2.imwrite(os.path.join(path,'image.jpg'),frame)
            # cv2.putText(frame,label,label_position,cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
            cv2.putText(frame,label,label_position, font, 1,(255,255,0),1,cv2.LINE_AA)
            arr.append(label)
        else:
            cv2.putText(frame,'No Faces',(30,80),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
     
     global rpred 
     global lpred 
     global score
     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
     faces = face.detectMultiScale(gray,minNeighbors=5,scaleFactor=1.1,minSize=(25,25))
     left_eye = leye.detectMultiScale(gray)
     right_eye =  reye.detectMultiScale(gray)

    #  cv2.rectangle(frame, (0,height-50) , (200,height) , (255,0,0) , thickness=cv2.FILLED )

     for (x,y,w,h) in faces:
        cv2.rectangle(frame, (x,y) , (x+w,y+h) , (100,100,100) , 1 )

     for (x,y,w,h) in right_eye:
        cv2.rectangle(frame, (x,y) , (x+w,y+h) , (100,100,100) , 1 )
        r_eye=frame[y:y+h,x:x+w]
        # count=count+1
        r_eye = cv2.cvtColor(r_eye,cv2.COLOR_BGR2GRAY)
        r_eye = cv2.resize(r_eye,(24,24))
        r_eye= r_eye/255
        r_eye=  r_eye.reshape(24,24,-1)
        r_eye = np.expand_dims(r_eye,axis=0)
        rpred = model.predict(r_eye)
        if(rpred[0][0]<0.9):
            lbl='Open'   
            # print(lbl)
        else:
            lbl='Closed'
            # print(lbl)
        break

     for (x,y,w,h) in left_eye:
        l_eye=frame[y:y+h,x:x+w]
        # count=count+1
        l_eye = cv2.cvtColor(l_eye,cv2.COLOR_BGR2GRAY)  
        l_eye = cv2.resize(l_eye,(24,24))
        l_eye= l_eye/255
        l_eye=l_eye.reshape(24,24,-1)
        l_eye = np.expand_dims(l_eye,axis=0)
        lpred = model.predict(l_eye)
        # print(lpred[0][0])
        if(lpred[0][0]<0.9):
            lbl='Open'   
            # print(lbl)
        else:
            lbl='Closed'
            # print(lbl)
        break

     if(rpred[0][0]>0.9 and lpred[0][0]>0.9):
        score=score+1
        # cv2.putText(frame,"Closed",(10,height-20), font, 1,(255,255,255),1,cv2.LINE_AA)
        
    # if(rpred[0]==1 or lpred[0]==1):
     else:
        score=0
        # cv2.putText(frame,"Open",(10,height-20), font, 1,(255,255,255),1,cv2.LINE_AA)
    
        
     if(score<0):
        score=0   
    #  cv2.putText(frame,'Score:'+str(score),(100,height-20), font, 1,(255,255,255),1,cv2.LINE_AA)
     if(score>15):
        
        cv2.putText(frame,"drowsy",(500,20), font, 1,(255,0,0),2, cv2.LINE_AA)
        try:
            sound.play()
           
            
        except:  # isplaying = False
            pass
        # if(thicc<16):
        #     thicc= thicc+2
        # else:
        #     thicc=thicc-2
        #     if(thicc<2):
        #         thicc=2
        # cv2.rectangle(frame,(0,0),(width,height),(0,0,255),thicc)        
     ret, buffer = cv2.imencode('.jpg', frame)
     frame = buffer.tobytes()
     yield(b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# cap.release()
# cv2.destroyAllWindows()
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video')
def video():
    return Response(gen_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__=="main_":
    app.run(host="0.0.0.0", debug=True)

# url ="http://192.168.230.29:5000/mlData"
# # jsonStr = json.dumps(arr, default = str)
# # print(jsonStr)   
# headers = {'Content-Type': 'application/json', 'Accept':'application/json'}
# # r = requests.post(url ="http://192.168.230.29:5000/mlData", data = payload)
# requests.post(url,data=json.dumps(arr), headers=headers)