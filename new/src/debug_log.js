// set to false to disable debugging


const Console = (arg1, arg2) => {
    const debug = true;

    {
        debug && console.log(arg1, arg2)
    }

}

export default Console