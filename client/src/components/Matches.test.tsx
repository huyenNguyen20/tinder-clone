import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Matches } from "./Matches";
import { User } from "../data/interface";

configure({ adapter: new Adapter() });

/******MOCK DATA******* */
const user1 = {
    id: "ab",
    firstName: "a",
    lastName: "b",
    picture: "pictureUrl1",
} as unknown as User;

const user2 = {
    id: "cd",
    firstName: "c",
    lastName: "d",
    picture: "pictureUrl2",
} as unknown as User;

const mockMatchesProps = {
    users: [user1, user2]
}

/******TEST SUITE******* */
describe("Matches Component", () => {
    let wrapper : any;


    describe("Empty users array props", () => {
        beforeEach(() => {
            wrapper = shallow(<Matches users={[]}/>)
        })
        it("should render the empty message", () => {
            expect(wrapper.find("#empty-message")).toHaveLength(1);

            expect(wrapper.find("#empty-message").first().text())
            .toBe("Oops, the list is empty now")
        })
    })

    describe("Not Empty users array props", () => {
        beforeEach(() => {
            wrapper = shallow(<Matches {...mockMatchesProps}/>)
        })

        it("the number of users rendered should equal to the length of user array", () => {
            expect(wrapper.find(".user-item"))
            .toHaveLength(mockMatchesProps.users.length);
        })

        it("should show the user avatar and user name", () => {
            expect(wrapper.find(".user-avatar").first().props().alt)
            .toBe(`${user1.firstName} ${user1.lastName}`);

            expect(wrapper.find(".user-avatar").first().props().src)
            .toBe(user1.picture);

            expect(wrapper.find(".user-name").first().props().primary)
            .toBe(`${user1.firstName} ${user1.lastName}`);
        })
    })
})