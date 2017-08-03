# Debugging and testing with Xcode Simulator 📱💻


### Tools to test on different devices

👎Chrome devices
👍Xcode Simulator, Browserstack or real devices

🙅 Don’t forget that if you want to click labels, you better use real devices, because clicking by mouse would have different effect!

### Go to the directory where your html file is and run localhost 

💻 ```ruby -run -e httpd . -p 8080``` 

### This will serve the file on http://localhost:8080/example.html

### Open Xcode Simulator and choose the device (Hardware -> Device -> choose model)

🤳 iPhoneSE and iPhone 6 (or 7 ) would be a good choice!

### To open your file on simulator device  

💻 ```xcrun simctl openurl booted 'http://localhost:8080/example.html'```

5. You want to check console? 
Go to Safari desktop (Develop -> Simulator) 💻
In case if you don't see your simulator in the list, restart Safari desktop browser

ℹ️```run xcrun simctl list``` - to get the list of all devices 
