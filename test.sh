#!/bin/bash

echo =============
echo Running test script from !PATH
echo =============

echo =============
echo Testing client
echo =============

cd client && npm i

npm t

cd ..

echo =============
echo END
echo =============
