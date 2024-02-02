---
title: 'ReadMe File for my Regex Tool'
date: '2023-11-24'
tags: ['readme','regex','npm']
---



# Installation
```
$ npm i regex-validation-tool
```


# Usage
```javascript
import {RVTool} from "regex-validation-tool"

const rvt = new RVTool();

const bool = rvt.isEmail("test@test.com") //bool == true
```

 # Default properties


- isEmail
- isPhone
- isUrl
- isPasswordLow
- isPasswordMedium
- isPasswordStrong 

# Overwriting default properties

To overwrite the default property create an object with the property's name and a new regex, then place it as RVTool's parameter.



```javascript
import {RVTool} from "regex-validation-tool"

const options = {
    isEmail: /\S/
}

const rvt1 = new RVTool();
const rvt2 = new RVTool(options);

const bool1 = rvt1.isEmail("test") //bool1 == false
const bool2 = rvt2.isEmail("test") //bool2 == true
```

# Creating custom validator

To create a custom validator use *customRegex* property. It requires regex as a parameter and returns a function, with what you can validate string with earlier specified regex.


```javascript
import {RVTool} from "regex-validation-tool"

const rvt = new RVTool();

const notBlank = rvt.customRegex(/\S/)

const bool = notBlank("test") // bool == true
```

# Password levels

| Level  | Description  |
| ------- | --- 
| Low | A password between 7 to 16 characters contains only characters, numeric digits, and an underscore, and the first character must be a letter.|
|Medium| Password must contain six characters or more and has at least one lowercase and one uppercase alphabetical character or has at least one lowercase and one numeric character or has at least one uppercase and one numeric character. | 
|Strong| A password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character |


# Regexes from the default properties
```javascript
const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const isPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

const isUrl = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

const isPasswordLow = /^[A-Za-z]\w{7,15}$/

const isPasswordMedium = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/

const isPasswordStrong = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
```
