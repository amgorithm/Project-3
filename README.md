# Project 3: Readme

# Description

For the third project on General Assembly’s Software Engineering course, we were divided into groups and assigned two weeks to create a full-stack MERN application. Our group included me, [Manohisoa](https://github.com/ManohisoaVicky), [Mohamed](https://github.com/Mohamed1419), and [Angeline](https://github.com/angelinewang). We decided to build a blogging website specifically geared toward software engineers. The website was to be named ‘Blen’; a merge between the first two letters of blogger and engineer.

After the project ended, Mano, Mohamed and I continued to work on ensuring full CRUD functionality and consistency in styling, debugging, and deployment. These extra tasks when added took around 4 full extra days.

The project's technical requirements were as follows:

1. Build a full-stack application by making your own backend and your own front-end
2. Use an Express API to serve your data from a Mongo database
3. Consume your API with a separate front-end built with React
4. Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
5. Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
6. Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
7. Be deployed online so it’s publicly accessible.

### Technologies used

- HTML5
- CSS
- JavaScript (ES6)
- ReactJS
- Mongoose and MongoDB
- Node.js
- Express.js
- Cloudinary
- Git
- GitHub

## Deployment link

The Blen application can be accessed here: https://blen-app.netlify.app/

Please note: the website’s backend is hosted on Render’s free tier, which limits speed. Navigating and performing CRUD functionalities on the application is very slow, **especially** on your first visit as the site requires “warming up” before it becomes _marginally_ faster. When you first visit the site, the homepage will take around 30 seconds to load blog posts and you could wait up to 1.5 minutes before being navigated back to the homepage after creating a blog post. It’s therefore important not to resend a fetch request by re-clicking a button/link.

## Getting Started/Code Installation

To run the project following download, enter the following commands in your terminal:

1. In the client folder run `npm install` and then `npm start`
2. In the server folder run `npm install` and then `npm start`

## Planning

Following several conversations, we agreed to build a blogging-based website split into four broad sections; homepage, detail page, create and edit page, and profile page. We each then chose which section(s) to build and used Excalidraw to sketch our plans.

I created a user story to help us think about how the typical steps a user would take to do the following tasks: read or create a blog, comment, and view or update their profile. I found Miro to be a useful tool for doing this.

![Miro plan](./client/src/images/readme/miro-plan.jpeg)

Each team member decided on which section of the project to work on. I decided to take responsibility for the profile page as it allowed me to play with the CRUD functionalities. I wanted the user to be able to add a bio, picture and handles for Twitter and Instagram. I also wanted to display a selection of the user's most recent blog posts and include a link to all of their blog posts.

Manohisoa and I took the lead in the application’s CSS vision. We brainstormed over colour schemes, font types, and layout designs. We scoured Dribbble and other blogging websites for inspiration and used coolors.co when picking colours, and font blogs when deciding between font choices. We created the navigation bar together and provided support to the group where necessary. Each team member was responsible for applying the CSS theme and making their components responsive by testing how the application appears on each set media query.

![Wireframe](./client/src/images/readme/wireframe.png)

Below is the redesign of the detail page and the navigation bar which I drafted and then implemented after the project ended.

![Detail and navbar wireframe](./client/src/images/readme/detail-nav-wireframe.png)

## Build/Code Process

### Server: Models, Controllers, and Routes

Group discussions about each of our section's plans informed our plans for creating the models for users and blogs. To create a link between the user and the blog post(s) they create, we added a reference between each Schema.

![User Schema](./client/src/images/readme/schema.png)

Manohisoa and I prepped the server side and the client’s utilities folder. On the server side, I created the blog controllers which needed to grab all and specific blog posts, and to create, update and delete a blog post. Manohisoa and I spent a good while mulling over how to create a link between users and their blog posts. It was through Manohisoa’s adjustments to the create a blog post function that the connection was finally made.

Although the get a blog and get user blog functions appear similar, the former generates the blog post’s author data, whereas the latter generates data of all blog posts by a user.

![Blog controller part 1](./client/src/images/readme/blog-controller-1.png)

![Blog controller part 2](./client/src/images/readme/blog-controller-2.png)

In the user controllers, I added a function that handles user’s updating their profile:

![User controller](./client/src/images/readme/user-controller.png)

Next, I connected the controllers to their respective routes and ensured that the authorisation checking middleware (which checks for a user logged in) was inputted for post, patch, and delete

Blogs route:

![Blog route](./client/src/images/readme/blog-route.png)

Users route:

![User route](./client/src/images/readme/user-route.png)

On the client side, I created a blog service utility file that holds the fetch request functions to the server that retrieves, creates, updates, and deletes blog posts. I also added a fetch request function that updates a user profile in the user service utility file.

After the server and client utility folder prep was complete, the team was free to start building their respective components.

### Client: Profile page and edit, and User blogs

#### Client: Profile page and edit

The profile page section is split into two sub-sections; the user information and a selection of their most recent blog posts, if it exists. During sign-up, a user only fills out a name, email, and password field. It is by way of the user model that users have a bio, profile picture (preset with a default photo), and Twitter and Instagram handle fields they can later add when editing their profile.

The user’s information is generated by invoking the getUserBlog function in the blog service file and passing in the user’s id (sourced from the URL via the useParams hook). If the user exists, their data is set to the state. However, if the user id does not match the state id of the user, the user does not exist, and the profile page gets redirected to the homepage.

![Profile page](./client/src/images/readme/profile-page.png)

Once the user’s information has been set to the state, the user’s profile and blog information is wrapped in a series of ternary operators that fill in each section depending on the data’s existence.

For the blog post section, I wanted to showcase a preview of a user’s four most recent blog posts and found that the CSS grid layout was the best option to display this. Below this preview is a link to another component that chronologically displays all of the user's blogs.

![User blogs preview](./client/src/images/readme/user-blogs-preview.png)

The profile edit page is a form with values assigned to the state's bio, image, Twitter, and Instagram fields. An object with the initial data as empty strings is set to state. As shown above, these fields are empty after a user signs up. To update these fields, users need to click an edit button on their profile page that redirects them to a form to fill the sections they wish. The form journeys to the backend via an updateProfileInfo function that passes in the state and the user id. Once updated, the user is navigated to their profile to see their changes.

![Profile edit page](./client/src/images/readme/profile-edit-page.png)

See below for a photo journey of Khadija adding information to her profile and how her profile looks after creating four blog posts.

![Khadija part 1](./client/src/images/readme/khadija-profile-1.png)

![Khadija part 2](./client/src/images/readme/khadija-profile-2.png)

![Khadija part 3](./client/src/images/readme/khadija-profile-3.png)

![Khadija part 4](./client/src/images/readme/khadija-profile-4.png)

#### Client: User blogs

The user blogs page was a straightforward process. Wrapped in a ternary operator, the page chronologically displays the user's blog posts. If the user does not exist, a redirection to the homepage is in place.

![User blogs](./client/src/images/readme/user-blogs.png)

![User blogs page](./client/src/images/readme/user-blogs-page.png)

### Challenges

The profile edit page proved to be the most challenging build. Most of the difficulties arose from the original profile Schema having a nested array of objects for a social media account field. I spent an inordinate amount of time writing and rewriting code, a lot of it hardcoded and an absolute eyesore. I concluded that a nested Schema and state are truly the stuff of nightmares and went back to the drawing board. I begrudgingly opted for the simpler method of replacing the nested array of objects with fields for Twitter and Instagram handles. Though inelegant and non-dynamic, the code works. I hope once I build more XP, I can come back and do it right this time.

Due to inconsistencies in styling and functioning, I had to redesign and recode the detail page after the project ended. There was also the challenge of figuring out how to keep and display blog post images post-deployment due to the Render platform not providing disk space. I ended up implementing Cloudinary to host the images and saved the returned image URL to the blog post. These tasks were more taxing and complicated than I had expected but I got there in the end. Below is the result of the rebuilt detail page which shows Khadija’s blog post with the successfully uploaded image:

![Detail page](./client/src/images/readme/detail-page.png)

### Wins

I am proud to have completed what I set out to achieve and to reach a somewhat comfortable level when building on the client and server side.

### Key Learnings/Takeaways

Although I’m still very much in the early stages of learning about the backend, I find myself more comfortable with it (especially in comparison to the frontend) and strangely, a budding preference for it. Ironically, before learning about the backend, the only image that sprang to mind when I heard ‘backend’ or ‘server’ was a labyrinth. I’m pleased to report that this image has now transformed into a less complicated maze.

### Bugs

No bugs to report in the profile, profile edit, detail, and user blogs pages!

Posting a blog post can take around 1 minute and 20 seconds from clicking the post button to being navigated back to the homepage. The code for the create blog post functionality is the same as my colleagues, who are strangely not experiencing this slowness. I've spent an additional week trying to debug this issue, including seeking help on Stack Overflow but am yet to come across a solution. As of this time (January 2023), this bug fix has been placed on the back burner as I intend to revisit it at a later date.

### Future Improvements

I hope to further enhance the application by adding the ability to follow other bloggers, add a featured blog post to your profile, and have a favourite blog list.
