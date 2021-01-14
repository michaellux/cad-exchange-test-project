const express = require('express');
const formidableMiddleware = require('express-formidable');

const app = express();
app.use(express.static('dist'));
app.use(formidableMiddleware());
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors());
app.listen(port, () => console.log(`Backend server live on ${port}`));

app.post('/coneParams', (req, res) => {
  const { coneHeight, numberOfsegments, radius } = req.fields.coneParams;
  let triangleCoords = [];
  const pointA = [0, 0, coneHeight];
  for (let i = 0; i <= numberOfsegments - 1; i += 1) {
    const pointPiXcoord = radius * Math.cos(2 * Math.PI * i / numberOfsegments);
    const pointPiYcoord = radius * Math.sin(2 * Math.PI * i / numberOfsegments);
    const pointPiPlusOneXcoord = radius * Math.cos(2 * Math.PI * (i + 1) / numberOfsegments);
    const pointPiPlusOneYcoord = radius * Math.sin(2 * Math.PI * (i + 1) / numberOfsegments);
    const pointPiZcoord = 0;
    const conicalSurfaceCoords = {
      A: pointA,
      Pi: [pointPiXcoord, pointPiYcoord, pointPiZcoord],
      PiPlusOne: [pointPiPlusOneXcoord, pointPiPlusOneYcoord, pointPiZcoord]
    };
    const baseCoords = {
      Zero: [0, 0, 0],
      Pi: [pointPiXcoord, pointPiYcoord, pointPiZcoord],
      PiPlusOne: [pointPiPlusOneXcoord, pointPiPlusOneYcoord, pointPiZcoord]
    };

    triangleCoords = [...triangleCoords,
      { conicalSurface: conicalSurfaceCoords, base: baseCoords }];
  }

  res.send({ triangleCoords });
});
