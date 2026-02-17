# FitBack 🏋️‍♂️

**FitBack** is a mobile application focused on managing gym workout routines. With it, users can intuitively organize their workout sheets by configuring exercise names, weights, sets, and repetitions.

##  Demonstration
<img width="403" height="860" alt="image" src="https://github.com/user-attachments/assets/2619f3a8-8283-4f96-b482-2dafb1a12063" />
<img width="400" height="851" alt="image" src="https://github.com/user-attachments/assets/8f43d0a6-6338-46ff-aadd-ad5bf1ef8822" />
<img width="396" height="853" alt="image" src="https://github.com/user-attachments/assets/c4c48820-26f6-4441-8144-6abe38c054b1" />
<img width="397" height="852" alt="image" src="https://github.com/user-attachments/assets/b518295e-fa57-4ac5-8eac-50d08cb98eb0" />
<img width="395" height="853" alt="image" src="https://github.com/user-attachments/assets/016f1933-fb1f-4534-93ad-f23fb08d8b5a" />
<img width="400" height="848" alt="image" src="https://github.com/user-attachments/assets/edd68bcb-cef5-4aeb-8a48-8cd62a34775d" />
<img width="399" height="853" alt="image" src="https://github.com/user-attachments/assets/1907851d-5db9-48aa-929e-d89fae643c21" />
<img width="400" height="856" alt="image" src="https://github.com/user-attachments/assets/2fdda9fb-bd2d-4eb4-b050-f38d27051b79" />
<img width="398" height="853" alt="image" src="https://github.com/user-attachments/assets/842276ca-b5ac-45ab-874f-6c969516e100" />

##  Features

* **User Authentication:** Secure login and registration using JWT and Google OAuth to keep your workout data safely stored in the cloud.
* **Workout Sheet Management:** Create, list, and organize different training routines (e.g., Workout A, Workout B).
* **Exercise Control:** Add detailed exercises within each workout sheet, specifying:
    * Exercise name
    * Number of sets
    * Number of repetitions
    * Load (weight)
* **Intuitive Interface:** Clean and straightforward design to ensure ease of use during your gym session.

##  Technologies Used

This project was developed using the following technologies:

**Front-end (Mobile):**
* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* Context API (for global state management and authentication)
* Axios (for REST API consumption)

**Back-end & Infrastructure:**
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Sequelize (ORM)](https://sequelize.org/) for database modeling
* Database (PostgreSQL / SQLite)

##  Getting Started

### Prerequisites

Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), and the [Expo Go](https://expo.dev/client) app on your smartphone (or a configured emulator).

> ** Important Note:** The backend API may take around 1 minute to wake up upon receiving the first request. Because of this, you will likely encounter a server connection error during the first minute of usage.

###  Running the App (Front-end)

```bash
# Clone this repository
$ git clone <your-repository-url-here>

# Access the project folder in your terminal/cmd
$ cd fitback

# Install the dependencies
$ npm install

# Run the application with Expo
$ npx expo start
