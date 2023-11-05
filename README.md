# ReduxExplorer007
A collection of code samples, projects, and experiments showcasing my journey of learning React and Redux. Dive into the world of building dynamic and scalable web applications using these powerful JavaScript libraries.

# Redux Toolkit Quick Start

- **Redux** is a predictable state container for **JavaScript applications**.
- **Redux** manages an application’s state with a **single global object** called **Store**.
- **Redux-toolkit** is a wrapper around pain **Redux**

link to follow:--- [React.js](https://react.dev/) and [Redux](https://redux-toolkit.js.org/usage/usage-guide)



## 1. install RTK & Redux

Install **Redux Toolkit** and **React-Redux**
Add the Redux Toolkit and React-Redux packages to your project:

    npm install @reduxjs/toolkit react-redux

## 2. create a Redux Store

Create a file named ***src/app/store.js***. Import the ***configureStore*** API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:

***app/store.js*** ---
    
   --javascript--
    
    import { configureStore } from '@reduxjs/toolkit'
    export const store = configureStore({ reducer: {}, })

   -- typescript --
   
    import { configureStore } from '@reduxjs/toolkit' 
    export const store = configureStore({ reducer: {}, }) 
    
    // Infer the `RootState` and `AppDispatch` types from the store itself 
    export type RootState = ReturnType<typeof store.getState> 
    
    // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState} 
    export type AppDispatch = typeof store.dispatch

## 3. Provide the Redux Store to React

Once the store is created, we can make it available to our React components by putting a React-Redux <**Provider**> around our application in ***src/index.js***. Import the Redux store we just created, put a <**Provider**> around your <**App**>, and pass the store as a prop:

***index.js***---
    
    import React from 'react'
    import ReactDOM from 'react-dom' 
    import './index.css' 
    import App from './App'
    import { store } from './app/store'
    import { Provider } from 'react-redux'  
	
	ReactDOM.createRoot(document.getElementById("root")).render( 
	    <Provider store={store}>
		   <App />
	    </Provider>
	)

##  4. Create a Redux State Slice

Add a new file named ***src/features/counter/counterSlice.js***. In that file, import the ***createSlice*** API from Redux Toolkit.

Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

Redux requires that [we write all state updates immutably, by making copies of data and updating the copies](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#immutability). However, Redux Toolkit's createSlice and createReducer APIs use [Immer](https://immerjs.github.io/immer/) inside to allow us to [write "mutating" update logic that becomes correct immutable updates](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#immutable-updates-with-immer).

***features/counter/counterSlice.js***---

   
--- javascript ---
	
	import { createSlice } from '@reduxjs/toolkit'

	const initialState = {
	  value: 0,
	}

	export const counterSlice = createSlice({
	  name: 'counter',
	  initialState,
	  reducers: {
	    increment: (state) => {
	      // Redux Toolkit allows us to write "mutating" logic in reducers. It
	      // doesn't actually mutate the state because it uses the Immer library,
	      // which detects changes to a "draft state" and produces a brand new
	      // immutable state based off those changes
	      state.value += 1
	    },
	    decrement: (state) => {
	      state.value -= 1
	    },
	    incrementByAmount: (state, action) => {
	      state.value += action.payload
	    },
	  },
	})

	// Action creators are generated for each case reducer function
	export const { increment, decrement, incrementByAmount } = counterSlice.actions

	export default counterSlice.reducer

--- typescript ---

	import { createSlice } from '@reduxjs/toolkit'		
	import type { PayloadAction } from '@reduxjs/toolkit'

	export interface CounterState {
	  value: number
	}

	const initialState: CounterState = {
	  value: 0,
	}

	export const counterSlice = createSlice({
	  name: 'counter',
	  initialState,
	  reducers: {
	    increment: (state) => {
	      // Redux Toolkit allows us to write "mutating" logic in reducers. It
	      // doesn't actually mutate the state because it uses the Immer library,
	      // which detects changes to a "draft state" and produces a brand new
	      // immutable state based off those changes
	      state.value += 1
	    },
	    decrement: (state) => {
	      state.value -= 1
	    },
	    incrementByAmount: (state, action: PayloadAction<number>) => {
	      state.value += action.payload
	    },
	  },
	})

	// Action creators are generated for each case reducer function
	export const { increment, decrement, incrementByAmount } = counterSlice.actions

	export default counterSlice.reducer
    
		

## 5. Add Slice Reducers to the Store
Next, we need to import the reducer function from the counter slice and add it to our store. By defining a field inside the reducer parameter, we tell the store to use this slice **reducer** function to handle all updates to that state.

***app/store.js***---

--- javascript ---

    import { configureStore } from '@reduxjs/toolkit'
	import counterReducer from '../features/counter/counterSlice'

	export const store = configureStore({
	  reducer: {
	    counter: counterReducer,
	  },
	})
-- typescript --

    import { configureStore } from '@reduxjs/toolkit'
	import counterReducer from '../features/counter/counterSlice'

	export const store = configureStore({
	  reducer: {
	    counter: counterReducer,
	  },
	})

	// Infer the `RootState` and `AppDispatch` types from the store itself
	export type RootState = ReturnType<typeof store.getState>
	// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
	export type AppDispatch = typeof store.dispatch

## 6. Use Redux State and Actions in React Components

Now we can use the React-Redux hooks to let React components interact with the Redux store. We can read data from the store with **useSelector**, and dispatch actions using **useDispatch**. Create a ***src/features/counter/Counter.js*** file with a ***< Counter >*** component inside, then import that component into ***App.js*** and render it inside of  **< App >**.

***features/counter/Counter.js***---

--- javascript ---

    import React from 'react'
	import { useSelector, useDispatch } from 'react-redux'
	import { decrement, increment } from './counterSlice'

	export function Counter() {
	  const count = useSelector((state) => state.counter.value)
	  const dispatch = useDispatch()

	  return (
	    <div>
	      <div>
	        <button
	          aria-label="Increment value"
	          onClick={() => dispatch(increment())}
	        >
	          Increment
	        </button>
	        <span>{count}</span>
	        <button
	          aria-label="Decrement value"
	          onClick={() => dispatch(decrement())}
	        >
	          Decrement
	        </button>
	      </div>
	    </div>
	  )
	}

-- typescript --

    import React from 'react'
	import type { RootState } from '../../app/store'
	import { useSelector, useDispatch } from 'react-redux'
	import { decrement, increment } from './counterSlice'

	export function Counter() {
	  const count = useSelector((state: RootState) => state.counter.value)
	  const dispatch = useDispatch()

	  return (
	    <div>
	      <div>
	        <button
	          aria-label="Increment value"
	          onClick={() => dispatch(increment())}
	        >
	          Increment
	        </button>
	        <span>{count}</span>
	        <button
	          aria-label="Decrement value"
	          onClick={() => dispatch(decrement())}
	        >
	          Decrement
	        </button>
	      </div>
	    </div>
	  )
	}

# summary

 ### What You've Learned

That was a brief overview of how to set up and use Redux Toolkit with React. Recapping the details:
>  💡 SUMMARY
-   **Create a Redux store with `configureStore`**
    -   `configureStore` accepts a `reducer` function as a named argument
    -   `configureStore` automatically sets up the store with good default settings
-   **Provide the Redux store to the React application components**
    -   Put a React-Redux `<Provider>` component around your `<App />`
    -   Pass the Redux store as `<Provider store={store}>`
-   **Create a Redux "slice" reducer with `createSlice`**
    -   Call `createSlice` with a string name, an initial state, and named reducer functions
    -   Reducer functions may "mutate" the state using Immer
    -   Export the generated slice reducer and action creators
-   **Use the React-Redux `useSelector/useDispatch` hooks in React components**
    -   Read data from the store with the `useSelector` hook
    -   Get the `dispatch` function with the `useDispatch` hook, and dispatch actions as needed 
