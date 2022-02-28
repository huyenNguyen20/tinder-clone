import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { User } from "../data/interface";
import *  as utils from "../lib/utils";
import { Discover } from "./Discover";

configure({ adapter: new Adapter() });

/******MOCK DATA******* */
const mockUser = {
    id: "ab",
    firstName: "a",
    lastName: "b",
    picture: "pictureUrl1",
    dateOfBirth: new Date("1990-10-21")
} as unknown as User;


const mockDiscoverProps = {
    user: mockUser,
    handleClose: jest.fn(),
    handleLike: jest.fn()
}
/******TEST SUITES******** */
describe("Discover Component", () => {
    let wrapper: any;
        
    beforeEach(() => {
        wrapper = shallow(<Discover {...mockDiscoverProps}/>)
    })

    it("should render the user picture correctly", () => {
        expect(wrapper.find("#user-picture")).toHaveLength(1);

        expect(wrapper.find("#user-picture").first().props().alt)
        .toBe(mockUser.firstName);

        expect(wrapper.find("#user-picture").first().props().src)
        .toBe(mockUser.picture);
    })

    it("should render the user's age and name correctly", () => {
        jest.spyOn(utils, "getAge").mockReturnValue(18);

        expect(wrapper.find("#user-name")).toHaveLength(1);

        expect(wrapper.find("#user-name").first().text())
        .toBe(`${mockUser.firstName} ${mockUser.lastName}, 18`);

        expect(utils.getAge).toHaveBeenCalled();
    })

    it("should render Close Button and ", () => {
        
    })
})