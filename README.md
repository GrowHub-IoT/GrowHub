<p align="center">
  <img src="https://github.com/GrowHub-IoT/GrowHub/blob/master/docs/assets/GrowHub_Logo.png?raw=true" alt="Logo GrowHub" width="245">
  <img src="https://github.com/GrowHub-IoT/GrowHub/blob/master/docs/assets/BSD-3_License.png?raw=true" alt="BSD3 License" width="185">
  <img src="https://github.com/GrowHub-IoT/GrowHub/blob/master/docs/assets/OSI.png?raw=true" alt="OSI" width="200">
</p>




<p align="center">
  <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="CC Logo" width="40" style="margin-right: 15px;">
  <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="CC BY Logo" width="40" style="margin-right: 15px;">
  <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="CC NC Logo" width="40" style="margin-right: 15px;">
  <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt="CC SA Logo" width="40">
  <br>
  <i>The <b>GrowHub IoT Documentation</b> is licensed under Creative Commons
  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1">CC BY-NC-SA 4.0</a>.</i>
</p>

# GrowHub IoT Integrated System
![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white)
![MQTT](https://img.shields.io/badge/MQTT-54039A?style=for-the-badge&logo=rss&logoColor=white)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Conda](https://img.shields.io/badge/conda-342B029.svg?&style=for-the-badge&logo=anaconda&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Firestore](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Bash](https://img.shields.io/badge/Bash-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![GCP](https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![SQLite](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Arduino](https://img.shields.io/badge/Arduino_IDE-00979D?style=for-the-badge&logo=arduino&logoColor=white)
![ESP8266](https://img.shields.io/badge/espressif-E7352C?style=for-the-badge&logo=espressif&logoColor=white)
![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-2C2D72?style=for-the-badge&logo=pandas&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly-239120?style=for-the-badge&logo=plotly&logoColor=white)


GrowHub IoT System is an advanced platform for real-time monitoring and management of hydroponic crops. It captures and processes four critical variables—temperature, pH, Total Dissolved Solids (TDS), and Electrical Conductivity (EC)—essential for maintaining optimal growing conditions. The system integrates data mining techniques to transform raw analog signals from sensors into structured JSON objects, ready for analysis and decision-making.

Sensor readings are dynamically processed in C++ and encapsulated into JSON objects, transmitted via MQTT every 4–8 seconds. These objects undergo serialization, deserialization, cleaning, and standardization to ensure data consistency and reliability. A Python microservice, built with Flask, manages the data pipeline, storing the cleaned JSON objects into NoSQL databases hosted on AWS (Mongo) and GCP (Firebase).

GrowHub's modular architecture and real-time visualizations powered by Plotly enable farmers to monitor trends, identify issues, and optimize their operations. This seamless integration of IoT, cloud technologies, and data processing establishes GrowHub as a key tool for precision and sustainable agriculture.


![Dashboard](https://github.com/GrowHub-IoT/GrowHub/blob/master/docs/assets/Dashboard.png?raw=true)




## 🚀 Features

GrowHub IoT tackles challenges in modern agriculture through its core capabilities:

<details>
  <summary>📊 Real-Time Data Collection</summary>
  GrowHub IoT monitors key hydroponic variables such as temperature, pH, TDS, and EC using high-precision sensors. These readings are processed and displayed on dynamic dashboards for actionable insights.
</details>

<details>
  <summary>🔒 Secure Data Transmission</summary>
  GrowHub IoT employs MQTT for reliable data transfer. While TLS encryption is supported, the current implementation focuses on device authentication using "bcrypt" for secure access to topics.
</details>

<details>
  <summary>☁️ Cloud Integration</summary>
  Data is stored and managed in MongoDB (AWS) and Firestore (Google Cloud Platform), allowing scalable and redundant storage with real-time synchronization.
</details>

<details>
  <summary>📈 Interactive Visualization</summary>
  The system's dashboards, built with Plotly, provide intuitive, real-time charts that help users analyze trends and optimize hydroponic performance.
</details>

<details>
  <summary>🔧 Modular Architecture</summary>
  Designed to scale with your needs, GrowHub IoT allows for seamless integration of new sensors and functionalities without interrupting operations.
</details>

### 🧪 Current Development Status


| Functional = 🟩 | Partially Functional = 🟨 | Non-Functional = 🟥 | Future Implementations = 🟦 |
|------------------|----------------------------|---------------------|-----------------------------|

| Feature                        | Description                          | 🟩 | 🟨 | 🟥 | 🟦 |
|--------------------------------|--------------------------------------|----|----|----|----|
| Real-Time Data Collection      | Collects sensor data in real-time    | 🟩 |    |    |    |
| Additional Sensor Types        | Support for more sensor types        |    |    |    | 🟦 |
| Secure Data Transmission       | Securely transmits data              |    | 🟨 |    |    |
| TLS Encryption                 | Adds TLS encryption for security     |    |    | 🟥 |    |
| Cloud Integration              | Stores data in the cloud             | 🟩 |    |    |    |
| Multi-Cloud Support            | Supports multiple cloud providers    |    |    | 🟥 |    |
| Interactive Visualization      | Real-time data visualization         | 🟩 |    |    |    |
| Advanced Analytics             | Provides advanced data analytics     |    |    |    | 🟦 |
| Modular Architecture           | Easily integrates new components     |    | 🟨 |    |    |
| Automatization & Control        | Multi-variable control mechanization    |    |    |    | 🟦 |


### 🧠 Project Context and Development Journey

GrowHub IoT is the culmination of a long and intensive journey of research, learning, and development. As a one-man army, I have single-handedly designed, implemented, and tested every aspect of this project. This public release represents a polished version derived from a private repository with over 100+ commits, reflecting countless hours of experimentation, coding, debugging, and iteration.

While many functionalities are operational, not all have been developed to the level of refinement I originally envisioned. Some features remain partially implemented due to time constraints, while others are potential ideas that I couldn't explore, such as predictive analytics through neural networks to provide recommendations for crop management. The result is a functional and modular system, but also a testament to the challenges and opportunities in working as a solo developer on a multidisciplinary project.

GrowHub is not just a software solution; it is a Research and Development (R&D) project with environmental and social goals. Throughout this process, I delved into topics far beyond software development, studying agricultural sciences and biotechnology to understand the intricacies of hydroponic systems. This learning journey included evaluating technologies that ultimately did not make it into GrowHub due to compatibility or feasibility issues. The system you see today is the outcome of this exploration—a balance between ambition, technical constraints, and a commitment to creating a meaningful tool for sustainable agriculture.


---
![Shell](https://github.com/GrowHub-IoT/GrowHub/blob/master/docs/assets/Shell.jpeg?raw=true)

## 🛠️ Installation

[![Python](https://img.shields.io/badge/Python-3.7%2B-darkblue)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-1.1.2-blue)](https://flask.palletsprojects.com/)
[![Bash](https://img.shields.io/badge/Bash-5.0-darkgreen)](https://www.gnu.org/software/bash/)
[![C++](https://img.shields.io/badge/C++-17-purple)](https://isocpp.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green)](https://www.mongodb.com/)
[![Firestore](https://img.shields.io/badge/Firestore-v7.20-orange)](https://firebase.google.com/products/firestore)
[![MQTT](https://img.shields.io/badge/MQTT-3.1.1-purple)](https://mqtt.org/)
[![ESP8266](https://img.shields.io/badge/ESP-8266MOD-darkred)](https://www.espressif.com/en/products/socs/esp8266)
[![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-4B-purple)](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.1-darkblue)](https://www.typescriptlang.org/)
[![Mosquitto](https://img.shields.io/badge/Mosquitto-3.1-purple)](https://mqtt.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.5.1-darkblue)](https://flask-sqlalchemy.palletsprojects.com/)
[![paho-mqtt](https://img.shields.io/badge/paho--mqtt-1.6.1-purple)](https://www.eclipse.org/paho/index.php?page=clients/python/index.php)
[![plotly](https://img.shields.io/badge/plotly-5.3.1-cyan)](https://plotly.com/python/)
[![pandas](https://img.shields.io/badge/pandas-1.3.3-red)](https://pandas.pydata.org/)
[![openpyxl](https://img.shields.io/badge/openpyxl-3.0.7-lightgrey)](https://openpyxl.readthedocs.io/)

### Requirements
Ensure the following are available for deploy:
- We strongly recommend to use Linux machine and a **Conda environment** with Python 3.7 or higher.
- Booteable MicroSD with Raspberry Pi OS (or any other 32-bit ARM Debian-based distribution, like 'Twister OS')
- At least one ESP8266MOD compatible with Arduino IDE to flashing GrowHub firmware (more information on 'Hardware Setup' below).
- Network infrastructure with a dedicated Access Point or a physical router acting as a switch to ensure robust MQTT communication between devices.

### Steps

1. **Clone the Repository**
   ```sh
   git clone https://github.com/rmardonesa/growhub.git
   cd growhub
   ```

2. **Set Up Virtual Environment and Install Dependencies**
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**
   ```sh
   cp .env.example .env
   nano .env
   ```

4. **Initialize the Database**
   ```sh
   python init_db.py
   ```

5. **Run the Application**
   ```sh
   python app.py
   ```
   Access the application at `http://localhost:5000`.

<details>
  <summary>💡 Advanced Configuration</summary>
  <br>
  To check the status of the Flask application and run it with specific options, use the following commands

  View Flask Logs:
  ```sh
   tail -f flask.log
   ```
  Run Flask:
  
  ```sh
   flask run --host=0.0.0.0 --port=5000
   ```

  Database Configuration
  
  *The default SQLite database provided by the software is basic and just a template. Users can enhance its complexity after running init_db.py. For example, you can add more tables, indexes, or migrate to a more robust database system like PostgreSQL or MySQL.*
  <br>
  Migrate to PostgreSQL:
  ```sh
  pg_dump -U postgres -d old_db > old_db.sql
  psql -U postgres -d new_db < old_db.sql
   ```

  
</details>

---

## 🧰 Hardware Setup

### 📡 ESP8266 Sensor Configuration

1. Open `sensors.ino` in Arduino IDE.
2. Update WiFi and MQTT broker settings.
3. Flash the ESP8266 with the updated code.

<details>
  <summary>📜 Sensor Calibration Details</summary>
  <p>
  <img src="https://github.com/GrowHub-IoT/GrowHub/blob/master/docs/assets/Calibration.png?raw=true" width=240>
  <p>
  Calibrate sensors for pH, TDS, and temperature to ensure precision.

  Watch this tutorial for pH sensor calibration (most important sensor of GrowHub IoT System):
  
  https://youtu.be/zUEl3Y3yKL4 (credits to Electronic Clinic, the video uploader)
  
</details>

#### Electronic Modules Connections

  
  | Module              | ESP8266MOD Pin     | Description                       |
  |---------------------|--------------------|-----------------------------------|
  | OneWire (DS18B20)   | GPIO2 (D4)         | Analog input                      |
  | OneWire (DS18B20)   | 3.3V               | Power supply                      |
  | OneWire (DS18B20)   | GND                | Ground                            |
  | pH Sensor (Analog)  | A0                 | Analog input                      |
  | 3.3V               | Power supply                      |
  | pH Sensor (Analog)  | GND                | Ground                            |
  | pH Sensor (Digital) | GPIO0 (D3)         | Digital input                     |
  | pH Sensor (Digital) | 3.3V               | Power supply                      |
  | pH Sensor (Digital) | GND                | Ground                            |
  | EC/TDS Sensor (Analog) | GPIO4 (D2)         | Analog input                   |
  | EC/TDS Sensor (Analog) | 3.3V               | Power supply                   |
  | EC/TDS Sensor (Analog) | GND                | Ground                         |



### 🍓 Raspberry Pi Configuration

1. Install Mosquitto MQTT broker:
   ```sh
   sudo apt-get update
   sudo apt-get install mosquitto mosquitto-clients
   ```
2. Configure using `mqtt.sh` script:
   ```sh
   ./mqtt.sh
   ```
<details>
  <summary>💡 MQTT Broker Customization</summary>
  
  *Customize the MQTT broker settings to fit your network infrastructure. You can configure the Mosquitto MQTT broker using the provided*
  <br>
  
  Set up Firewall Rules:
  ```sh
   sudo ufw allow 5000/tcp
   sudo ufw allow 1883/tcp
   sudo ufw enable
   ```
  Start Mosquitto Service:
  ```sh
   sudo systemctl start mosquitto
   ```

  Check Mosquitto Status:
  ```sh
   sudo systemctl status mosquitto
   ```

  View Mosquitto Logs:
  ```sh
   sudo journalctl -u mosquitto -f
   ```

  Execute GrowHub MQTT Manager:
  ```sh
   sudo bash
   cd <GrowHub BashScript directory>
   ./mqtt.sh
   ```



  

  


</details>






   
<p align="center">
  <img src="https://github.com/GrowHub-IoT/GrowHub/blob/master/docs/assets/Prototype_01.png?raw=true" width="380">
  <img src="https://github.com/GrowHub-IoT/GrowHub/blob/master/docs/assets/Prototype_02.png?raw=true" width="340">
<p>


---

## 🔮 Contributing

We welcome contributions! Follow these steps:

1. **Fork the Repository**
   ```sh
   git checkout -b feature/your-feature
   ```

2. **Implement Your Changes**

3. **Commit and Push**
   ```sh
   git push origin feature/your-feature
   ```

4. **Open a Pull Request**

<details>
  <summary>🧭 Contribution Guidelines</summary>

  <table>
    <tr>
      <th>Rule</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>I</td>
      <td>Adhere to Coding Standards: Ensure your code follows the project's coding standards and style guidelines. Use linters and formatters where applicable.</td>
    </tr>
    <tr>
      <td>II</td>
      <td>Document Your Changes: Update the documentation to reflect your changes. This includes comments in the code, updates to README.md, and any other relevant documentation files.</td>
    </tr>
    <tr>
      <td>III</td>
      <td>Update CHANGELOG.md: Add a summary of your changes to the CHANGELOG.md file, including any new features, bug fixes, or breaking changes.</td>
    </tr>
    <tr>
      <td>IV</td>
      <td>Perform Thorough Testing: Before submitting your pull request, thoroughly test your changes to ensure they work as expected and do not introduce new issues.</td>
    </tr>
    <tr>
      <td>V</td>
      <td>Follow Commit Message Guidelines: Write clear and concise commit messages that describe the changes made. Use the imperative mood and present tense.</td>
    </tr>
    <tr>
      <td>VI</td>
      <td>Engage in Code Reviews: Be responsive to feedback during the code review process. Address any comments or requested changes promptly and engage in constructive discussions.</td>
    </tr>
    <tr>
      <td>VII</td>
      <td>Respect the Project's License: Ensure that your contributions comply with the project's licensing terms and do not introduce any incompatible licenses.</td>
    </tr>
  </table>

</details>

---

## 📜 Licenses
[![License](https://img.shields.io/badge/License-BSD%203%20-darkred)](LICENSE)
[![Creative Commons](https://img.shields.io/badge/Docs-CC%20BY--NC--SA%204.0-black)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

This project is released under two licenses:

### GrowHub IoT Software
<details>
  <summary>📕 BSD 3-Clause License</summary>
  <a href="https://github.com/rmardonesa/growhub/blob/master/LICENSE"> Copyright (c) 2024, Rodrigo Mardones</a>

  | Type          | Description                                                                 |
  |---------------|-----------------------------------------------------------------------------|
  | ✅ Commercial Use | This software can be used for commercial purposes.                          |
  | ✅ Modification   | You can modify the software and create derivative works.                    |
  | ✅ Distribution   | You can distribute the original or modified versions of the software.       |
  | ✅ Private Use    | You can use the software for private purposes.                              |
  | ❌ Liability      | The authors are not liable for any damages arising from the use of the software. |
  | ❌ Warranty       | The software is provided "as is", without any warranty.                     |
  | ⚠️ Attribution    | You must give appropriate credit, provide a link to the license, and indicate if changes were made. |

</details>

### GrowHub IoT Documentation
<details>
  <summary>📘 Creative Commons BY-NC-SA 4.0</summary>
  <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"> CC Attribution-NonCommercial-ShareAlike 4.0 International License</a>

  | Type          | Description                                                                 |
  |---------------|-----------------------------------------------------------------------------|
  | ✅ Sharing         | You can copy and redistribute the material in any medium or format.         |
  | ❌ Commercial Use  | You may not use the material for commercial purposes.                       |
  | ✅ Modification    | You can remix, transform, or build upon the material, as long as you distribute your contributions under the same license as the original. |
  | ⚠️ Attribution     | You must give appropriate credit, provide a link to the license, and indicate if changes were made. |
  | ⚠️ No Additional Restrictions | You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits. |

</details>

---

## 🎖️ Acknowledgements

This project integrates open source technologies, thanks to all developers of those tools, libraries and frameworks that make GrowHub possible

<details>
  <summary>🎉 Additional Credits</summary>
  
 
  ### Special grateful with the following contributors:

  **Diego Salas**, *Digital Designer* of GrowHub's logo, he did a great job!

  Sometimes communication between developers and designers is not easy, but you understood my project's identity pretty well, I wish to you the best as a professional, I'm glad to have collaborated with you.


  **Jorge Arenas**, *Hydroponics Specialist*, with more than 15 years of experience!
  
  In addition to being a successful businessman, he is a promoter of clean energy, creator of jobs for people, and has maintained a social role throughout his admirable career.

  
</details>

---

## 📚 Additional Resources

- [Raspberry Imager](https://www.raspberrypi.com/software/)
- [Mosquitto Broker](https://mosquitto.org)
- [Espressif ESP8266MOD](https://www.espressif.com/en/products/modules/esp8266)
