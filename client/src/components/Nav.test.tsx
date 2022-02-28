import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Nav, NavType } from "./Nav";

configure({ adapter: new Adapter() });

/***********MOCK DATA************* */
const mockNavProps = {
    type: NavType.Discover,
    handlePass: jest.fn(),
    handleDiscover: jest.fn(),
    handleMatches: jest.fn()
}
/***********TEST SUITE************* */
describe("Navigation Bar", () => {
    let wrapper : any;

    beforeEach(() => {
        wrapper = shallow( <Nav {...mockNavProps}/> );
    })

    it("Nav Component to be defined", () => {
       expect(wrapper).toBeDefined;
    })

    it("As Pass Button is clicked, should call handlePass", async () => {
        wrapper.find("#pass-btn").first().simulate("click");

        expect(mockNavProps.handlePass).toHaveBeenCalled();
    })

    it("As Discover Button is clicked, should call handleDiscover", async () => {
        wrapper.find("#discover-btn").first().simulate("click");

        expect(mockNavProps.handleDiscover).toHaveBeenCalled();
    })

    it("As Matches Button is clicked, should call handleMatches", async () => {
        wrapper.find("#matches-btn").first().simulate("click");

        expect(mockNavProps.handleMatches).toHaveBeenCalled();
    })
})