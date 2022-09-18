import serial
import random
from flask import Flask, json, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "http://localhost:5500"}})
app.config['CORS_HEADER'] = 'Content-Type'


try:
  ser = serial.Serial('COM9') #Replace this line with the name of the serial through which incoming data is coming through
except:
  pass

api = Flask(__name__)


@api.route('/companies', methods=['GET'])
@cross_origin()
def get_companies():
  try:
    val = ser.readline().decode().strip().split(',')
    print(val)
  except:
    val = [0,0,0,0]
  response = jsonify({"readings": val})
  return response

if __name__ == '__main__':
    api.run() 