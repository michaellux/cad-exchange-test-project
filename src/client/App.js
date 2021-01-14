/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import './app.css';
import {
  Grid, TextField, Button, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

// taken from https://codesandbox.io/s/r3f-basic-triangle-kl11e
import GridHelper from './components/GridHelper';
import Triangle from './components/Triangle';
//

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root, & .MuiButton-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  params: {
    display: 'grid'
  }
}));

const Scene = (props) => {
  const { triangles } = props;
  console.log(triangles);

  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      camera={{
        position: [20, 10, -10, 1000]
      }}
    >
      <>
        {
          (triangles !== undefined)
            && Array.isArray(triangles.triangleCoords)
            ? triangles.triangleCoords.map((triangle) => {
              const conicalSurfaceVertices = [
                new THREE.Vector3(triangle.conicalSurface.A['0'], triangle.conicalSurface.A['1'], triangle.conicalSurface.A['2']),
                new THREE.Vector3(triangle.conicalSurface.Pi['0'], triangle.conicalSurface.Pi['1'], triangle.conicalSurface.Pi['2']),
                new THREE.Vector3(triangle.conicalSurface.PiPlusOne['0'], triangle.conicalSurface.PiPlusOne['1'], triangle.conicalSurface.PiPlusOne['2'])
              ];
              return (
                <Triangle type="conicalSurface" vertices={conicalSurfaceVertices} />
              );
            }) : ('Треугольников нет')
        }
        {
          (triangles !== undefined)
            && Array.isArray(triangles.triangleCoords)
            ? triangles.triangleCoords.map((triangle) => {
              const baseVertices = [
                new THREE.Vector3(triangle.base.Zero['0'], triangle.base.Zero['1'], triangle.base.Zero['2']),
                new THREE.Vector3(triangle.base.Pi['0'], triangle.base.Pi['1'], triangle.base.Pi['2']),
                new THREE.Vector3(triangle.base.PiPlusOne['0'], triangle.base.PiPlusOne['1'], triangle.base.PiPlusOne['2'])
              ];
              return (
                <Triangle type="base" vertices={baseVertices} />
              );
            }) : ('Треугольников нет')
        }
      </>

      <GridHelper />
      <OrbitControls />
    </Canvas>
  );
};

Scene.defaultProps = { triangles: {} };

export default function App() {
  const [sceneState, setSceneState] = useState('start');
  const [coneHeight, setConeHeight] = useState(20);
  const [radius, setRadius] = useState(10);
  const [numberOfsegments, setNumberOfsegments] = useState(20);
  const [triangles, setTriangles] = useState();
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    const coneParams = {
      coneHeight,
      radius,
      numberOfsegments
    };
    axios.post('http://localhost:8080/coneParams', { coneParams })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setSceneState('done');
        setTriangles(res.data);
      });
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={3} sm={3}>
          <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            <div className={classes.params}>
              <TextField
                id="cone_height"
                label="cone height"
                defaultValue={coneHeight}
                variant="outlined"
                type="number"
                onChange={event => setConeHeight(event.target.value)}
              />
              <TextField
                id="radius"
                label="radius"
                defaultValue={radius}
                variant="outlined"
                type="number"
                onChange={event => setRadius(event.target.value)}
              />
              <TextField
                id="number_of_segments"
                label="number of segments"
                defaultValue={numberOfsegments}
                variant="outlined"
                type="number"
                onChange={event => setNumberOfsegments(event.target.value)}
              />
              <Button type="submit" variant="contained" color="primary">
                Calculate
              </Button>
            </div>
          </form>
        </Grid>
        <Grid item xs={9} sm={9}>
          {sceneState === 'start' ? (
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography align="center">Set params and click "Calculate" button</Typography>
            </Grid>
          ) : <Scene triangles={triangles} />}
        </Grid>
      </Grid>
    </Fragment>
  );
}
