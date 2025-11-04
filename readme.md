# UWRF ACM Webpage

## Configuration
#### [events.json](config/events.json)
Root: Array
- **title** (required): Official title for the event.
- **description** (optional, synonyms: desc): Expanded explanation of the event.
- **date** (optional): The date which the event is to take place on.
- **time** (optional): Time at which the event is to take place at.
- **recursion** (optional):
  - **start_date** (optional): Functions like date, but can also be used for recursive calculations.
  - **end_date** (optional): If **start_date** has been specified, a range will be displayed.
    Ex: `9/13/2020 - 10/13/2020`
  - **repeats_on** (optional): Interprets the event as a weekly activity. Instead of displaying
    `On 9/13/2020`, it will display `Every Mon, Tues, and Fri`.
  - **repeats_every** (optional): From **start_date**, n days are added repeatedly until a future date
    is calculated. Ex: `"date": "9/13/2020"` and `"repeats_every": 3` becomes `9/16/2020`, 
    unless 9/16/2020 is in the past, in which case `9/19/2020` is displayed, and so on.
    
Example:
```json
[
  {
    "title": "ACM Meeting",
    "description": "Join us for club activities!",
    "time": "5:00pm",
    "recursion": {
      "repeats_on": "W"
    }
  },
  {
    "title": "Vote for Vice President",
    "recursion": {
      "start_date": "4/20/2020",
      "end_date": "4/26/2020"
    }
  }
]
```
#### [links.json](config/links.json)
Root: Array
- service (optional): Make sure to give the link an appropriate name for what it links to so students
  know where they are going to. If not included, it will not be displayed.
- **link** (required): The actual link.
- **image** (optional, synonym: img): The web address (local or external) for the photo 
  you'd like to go along with this link. If no image has been specified, a qr code for 
  the link will be used instead.
  
Example:
```json
[
  {
    "service": "Discord",
    "link": "https://discord.gg/9jsFjrd"
  }
]
```
#### [officers.json](config/officers.json)
Root: Array
- **name** (required): The preferred name for the officer.
- **role** (required, synonym: position): The position the officer holds.
- **email** (optional): Can be specified if the officer's email address differs 
  from `first.last@my.uwrf.edu`

Example:
```json
[
]
```
#### [swears.json](config/swears.json)
Root: Array
- Any string you wish to be blacklisted from appearing in titles of the meme-of-the-day.