# ChopChop

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Project Links](#project-links)
-   [Project Video](#project-video)
-   [Tech Stack](#tech-stack)
-   [Installation](#installation)
-   [Database Design](#database-design)
-   [Usage](#usage)
-   [Environment Variables](#environment-variables)
-   [Contributing](#contributing)
-   [Contact](#contact)

## Introduction

ChopChop is a modern URL shortener app designed to transform long URLs into concise, easy-to-share links. Users can create custom URLs, generate QR codes, and access detailed analytics for each link, including geographical location and device information. This project serves as a showcase of my frontend development skills, backend integration using Supabase, and my ability to create user-friendly web applications.

## Features

-   **URL Shortening:** Users can input long URLs and get a shortened version, with the option to customize the shortened URL.
-   **QR Code Generation:** The app generates a QR code for the shortened URL, with the ChopChop logo embedded.
-   **Dashboard:** Users can view all their created links, total links created, and total clicks received.
-   **Link Analytics:** Each shortened URL has a detailed analytics page, showing:
    -   A line chart of the top 5 geographical locations where the link was clicked.
    -   A device information chart displaying clicks by mobile and desktop devices.
-   **User Journey Continuation:** If a user is not logged in and tries to create a link, they are redirected to the sign-in page and then back to the link creation form upon login.

## Project Links

[Live Project](https://chopchop.abhishekshukla.xyz/)

## Project Video

Click the below preview to watch the demo video

[![Video Preview](https://img.youtube.com/vi/SJmNKcsE3Xs/0.jpg)](https://www.youtube.com/watch?v=SJmNKcsE3Xs)

## Tech Stack

-   **Frontend:** React, Tailwind CSS, React Router, Recharts, Radix UI, Shadcn
-   **Backend:** Supabase
-   **Tools:** Vite, ESLint, Framer Motion

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ShuklaAbhishek99/chop-chop
    cd chop-chop
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    - Create a `.env` file in the root directory and add the necessary environment variables as outlined in the [Environment Variables](#environment-variables) section.

    &nbsp;

4. **Start the development server:**

    ```bash
    npm run dev
    ```

## Database Design

The project uses Supabase for backend services, including user authentication and data storage. Below is an overview of the database collections used in the project:

| Collection Name | Description                                    | Fields                                                   |
| --------------- | ---------------------------------------------- | -------------------------------------------------------- |
| `users`         | Stores user information and preferences.       | `id`, `email`, `name`, etc.                              |
| `urls`          | Stores information about each shortened URL.   | `id`, `user_id`, `long_url`, `short_url`, `clicks`, etc. |
| `clicks`        | Tracks click analytics for each shortened URL. | `id`, `link_id`, `location`, `device`, `timestamp`, etc. |

## Usage

After installation, you can use the following commands to interact with the project:

-   **Start the server:**

    ```bash
    npm run dev
    ```

-   **Build for production:**

    ```bash
    npm run build
    ```

-   **Preview the build:**

    ```bash
    npm run preview
    ```

## Environment Variables

The following environment variables are required for the project:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SITE_URL =
```

## Contributing

I am not accepting contributions at the moment.

## Contact

For any questions or feedback, feel free to contact me:

-   **Email:** abhishekworks99@gmail.com
-   **LinkedIn:** [Abhishek Shukla](https://www.linkedin.com/in/abhishek-shukla99/)
-   **Twitter:** [@abhishekshukl99](https://x.com/abhishekshukl99)

---
