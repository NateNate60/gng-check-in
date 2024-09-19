# gng-check-in

This is a check-in system that keeps track of event attendance at Geeks & Games, a local game shop in Oregon City. `gng-check-in` was commissioned in August 2022 by the late Anna Wessel, the former manager of Geeks & Games. The original iteration was a janky PHP app. This newer iteration, developed in late summer of 2024, brings several improvements to the user interface and management interface, including new sorting options for check-in data and a reactive UI using modern ReactJS features.

A PHP backend is located in `/gng`, the frontend is located in `src/app` and is built using NextJS.

This project is not accessible from the public Internet for security reasons. It is deployed on a check-in tablet located inside Geeks & Games. To-date, both iterations have logged nearly 500 unique players and over 2,000 attendance records.

Copyright (C) 2022-2024 Nathan Lim, all rights reserved. For licensing rights, please contact Nathan Lim (nathanlim2004@gmail.com). The G&G logo is a trademark of Geeks & Games, Inc. and used with permission.