const webURL: string = import.meta.env.VITE_APP_NODE_ENV == 'development' ? "http://localhost:8081" : "https://blog.raxskle.fun";
// const webURL: string = import.meta.env.VITE_APP_NODE_ENV == 'development' ? "https://blog.raxskle.fun" : "https://blog.raxskle.fun";
// "http://114.132.58.27:8081"
export { webURL };