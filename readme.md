# A simple NodeJS backend

Repetative work is always boring. Some time creating router, controller, service, and even repo are very repetative in many project like in small MVP, where often we need just basic CURD API for a spacific entity. Focuse of this project is to create a salution to avaoid these repetative work. 



# Architecture Overview

* Model
* Repo
* Service
* Controller
* Router

# Project structure

```json
| - node_modules
| - dest
| - src
|	| - environment
|	| - bin
|	| - lib
|		| - modules
|		|	| - __common__
|		|	| - <example_module>
|		|		| - model.ts
|		|		| - repo.ts
|		|		| - service.ts
|		|		| - controller.ts
|	 	|
|		| - router
|		| - utils
|
| - package.json
| - gulpfile.js
| - tsconfig.ts
```



# Getting start

1. Pre-requirrities

   1. Mongoose

2. Clone the project

3. Install depandancy 

4. Create a module inside `src/lib/modules`

5. Now create a model `model.ts` Note: Model name (Collection name) and module name must be same






# Licence


The MIT License (MIT)

Copyright (c) 2016-2018 Thales Services SAS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.