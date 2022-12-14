# cad-exchange-test-project
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/996f7999507b41f198dac4e54ed71a56)](https://www.codacy.com/gh/michaellux/cad-exchange-test-project/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=michaellux/cad-exchange-test-project&amp;utm_campaign=Badge_Grade)
## Task
Create a simple client-server web application which can display a simple cone in a 3D view.
<img align="left" src="./cone.png">

The application should provide the following functionality: 
1. This should be a single page application (SPA), both with front-end and back-end. 
2. The user should enter parameters (cone height, radius and number of segments on a circle) via client. 
3. The client should transfer the data to the server. 
4. The server must compute triangulation of the cone (i.e. a set of triangles to be used for display) and 
pass it back to the client.  
5. The client should display computed triangulation in a 3D view using WebGL (e.g. with the help of 
the three.js library). 
6. Make sure your implementation neither exposes memory leaks nor overutilizes CPU on repeated 
usage.

For back-end implementation we recommend using node.js (although you may choose any other alternative).

## Solution

![Скриншот программы](./working_app.png)
### Project setup
npm install
### Build project
npm run build
### Launch project
npm run start

