
# from keras.models import load_model
# from time import sleep
import tensorflow as tf
import requests
import json
from tensorflow.keras.utils import img_to_array
# from keras.preprocessing import image
import cv2
import numpy as np
from flask import Flask, render_template, Response
import os
from pygame import mixer

mixer.init()
sound = mixer.Sound('emotion/alarm.wav')


face = cv2.CascadeClassifier('emotion\haar cascade files\haarcascade_frontalface_alt.xml')

lbl=['Close','Open']
arr = []


path = os.getcwd()
cap = cv2.VideoCapture(0)


font = cv2.FONT_HERSHEY_COMPLEX_SMALL


emotion_interpreter = tf.lite.Interpreter(model_path="emotion/models/new_emot_lite.tflite")
emotion_interpreter.allocate_tensors()

emotion_input_details = emotion_interpreter.get_input_details()
emotion_output_details = emotion_interpreter.get_output_details()

emotion_input_shape = emotion_input_details[0]['shape']

class_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
app=Flask(__name__)


def gen_frames():
   while True:
     ret, frame = cap.read()
     height,width = frame.shape[:2]
    #  labels = []
     gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
     faces = face.detectMultiScale(gray)

     for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,255),2)
        roi_gray = gray[y:y+h,x:x+w]
        roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)



        if np.sum([roi_gray])!=0:
            roi = roi_gray.astype('float')/255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi,axis=0)

            emotion_interpreter.set_tensor(emotion_input_details[0]['index'], roi)
            emotion_interpreter.invoke()
            emotion_preds = emotion_interpreter.get_tensor(emotion_output_details[0]['index'])
            
            label=class_labels[emotion_preds.argmax()]  #Find the label
            label_position=(x,y)
            # cv2.imwrite(os.path.join(path,'image.jpg'),frame)
            # cv2.putText(frame,label,label_position,cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
            cv2.putText(frame,label,label_position, font, 1,(255,255,0),1,cv2.LINE_AA)
            arr.append(label)
        else:
            cv2.putText(frame,'No Faces',(30,80),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
    #  fps = int(cap.get(cv2.CAP_PROP_FPS)) # access FPS property
   
     ret, buffer = cv2.imencode('.jpg', frame)
     frame = buffer.tobytes()
     yield(b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


# jsonStr = json.dumps(arr, default = str)
# print(jsonStr)   

# r = requests.post(url ="http://192.168.230.29:5000/mlData", data = payload)
   
# cap.release()
# cv2.destroyAllWindows()
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video') 
def video():
    return Response(gen_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__=="__main__":
    app.run(host="0.0.0.0", debug=True)

url ="http://192.168.20.177:5000/mlData"
# jsonStr = json.dumps(arr, default = str)
# print(jsonStr)   
headers = {'Content-Type': 'application/json', 'Accept':'application/json'}
# r = requests.post(url ="http://192.168.230.29:5000/mlData", data = payload)
requests.post(url,data=json.dumps(arr), headers=headers)
