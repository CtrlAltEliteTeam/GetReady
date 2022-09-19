import NavBar from "../components/navbar/Navbar";
import {render} from "@testing-library/react";


it("renders correctly", () => {
    render(<NavBar/>);
    const element = document.body.innerText;
    console.log(element);
});