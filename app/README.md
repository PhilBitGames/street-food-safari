To run this app:
1. Update the API_BASE_URL address in api.ts to your PC's IPv4 address (and include the 3333 port).
2. Run 'npx expo install' to install dependencies.
3. Run 'npx expo start' to start a local expo development server.
4. Follow the instructions to build and run on Web, iOS, or Android.

Design/Architecture decisions:

I wanted this project to be modular and scalable, so I prioritized seperating responsibilities and created resuable components and functionality (like VendorCard and VendorFetch) to assure ease of implementation and visual and functional consistency across different sections of the app. I seperated a great deal of style properties to a single place to play around with visual nuances. As it is supposed to resemble a hyper accessible phone application, I prioritized responsiveness and intuitiveness.

Additions:
- The assignment didn't mention implementing the Favorites screen but I decided to anyway.
- All screens have an animated loading symbol when fetching data.

Potential improvements: 
- Make styling easier to manage and utilize. Implement a set colour scheme for greater consistency. Group style components depending on where they are used.
- Fix search bar bug where it loses focus from typing.
- Seperate more overlapping functionality between VendorScreen and Favorites screen.