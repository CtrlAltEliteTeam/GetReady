import  axios  from "axios";

export default axios.create({
    baseURL:'http://localhost:8000/api'
    // baseURL:'https://getready-tms.herokuapp.com/api'
});

//defines the base ulr for any server calles via axiose