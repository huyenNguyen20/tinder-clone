import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { User } from "../data/interface";
import { Header } from "./Header";

configure({ adapter: new Adapter() });

/******MOCK DATA******* */
const user = {
    id: "ab",
    firstName: "a",
    lastName: "b",
    picture: "pictureUrl1",
} as unknown as User;

/******TEST SUITES******** */
describe("Header Component", () => {
    let wrapper: any;
    describe("Without loggedInUser prop", () => {
        
        beforeEach(() => {
            wrapper = shallow(<Header pageName="Test" loggedInUser={null}/>)
        })

        it("should render the page title correctly", () => {
            expect(wrapper.find("#page-title").first().text())
            .toBe("Test");
        })

        it("should not render the user avatar", () => {
            expect(wrapper.find("#user-avatar"))
            .toHaveLength(0);
        })
    })

    describe("With loggedInUser prop", () => {
        beforeEach(() => {
            wrapper = shallow(<Header pageName="Test" loggedInUser={user}/>)
        })

        it("should not render the user avatar correctly", () => {
            expect(wrapper.find("#user-avatar"))
            .toHaveLength(1);

            expect(wrapper.find("#user-avatar").first().props().alt)
            .toBe(user.firstName);

            expect(wrapper.find("#user-avatar").first().props().src)
            .toBe(user.picture);
        })
    })

})