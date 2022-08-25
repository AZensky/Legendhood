# LegendHood

LegendHood is a website clone, inspired by Robinhood. LegendHood can be used to find live and past stocks trends, as well as replicate the functionality of buying and selling stocks. LegendHood users can also find trending market news and headlines specific to companies. LegendHood is ideal for all individuals interested in stocks and investing.

**Live Site:** [LegendHood](https://robinhood-clone-project.herokuapp.com/)

## Wiki Links
- [API Documentation](https://github.com/AZensky/RobinhoodClone/wiki/API-Documentation)
- [Database Schema](https://github.com/AZensky/RobinhoodClone/wiki/Database-Schema)
- [Feature List](https://github.com/AZensky/RobinhoodClone/wiki/Feature-List)
- [User Stories](https://github.com/AZensky/RobinhoodClone/wiki/User-Stories)

## Tech Stack

### Frameworks, Platforms, and Libraries:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
 ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
 
### Database: 

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Hosting:

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Landing Page

![legendhood-landing](https://user-images.githubusercontent.com/95510710/186485307-fd942bfd-d118-4419-9201-c0d001bacba3.png)

## Dashboard Page

![RHdashboard](https://user-images.githubusercontent.com/100141010/186544453-f9c104fe-3d72-4d67-9707-75c414cec724.png)

## Stock Details Page

![RHStockDetails](https://user-images.githubusercontent.com/100141010/186544455-e02f544b-b3a0-4c37-b71f-a6ae553f28d5.png)

![RHStockDetailsWatchlistForm](https://user-images.githubusercontent.com/100141010/186544459-7d0bbfd6-77ae-4f9a-be25-6c1604171cab.png)

## Watchlist Page
![RHWatchlistPage](https://user-images.githubusercontent.com/100141010/186544461-0ac7304a-c2cb-47d9-be56-29151bac9ea7.png)

## 404 Page

![RH404Page](https://user-images.githubusercontent.com/100141010/186544446-f2fa6386-64c4-49e3-a7a6-f799a5750ef9.png)

## Run Locally

- Clone the repo
- Open up two terminals, one for the backend, and one for the frontend
- In the first terminal, in the root folder, run pipenv install to install the necessary dependencies, and then run pipenv run flask run
- In the second terminal, cd into the react-app folder, run npm install to install the necessary dependencies, and then run npm start

### Environment Variables

To run this project, you need to add the following enviroment variables to your .env file in your root folder.

```
DATABASE_URL=sqlite:///dev.db
SECRET_KEY=«generate_strong_secret_here»
ALPHA_VANTAGE_API_KEY= *** Insert free alpha vantage api key ***
FINNHUB_API_KEY= *** A premium key from finnhub is needed to run this locally ***
```

## To-do-list

- Utilizing Multithreading to speed up api calls in backend
- Dark Mode
