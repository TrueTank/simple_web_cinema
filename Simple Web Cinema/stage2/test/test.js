import path from 'path';
const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        // Test 1 - check header
        this.page.execute(() => {
            this.header = document.getElementsByTagName('header');

            return this.header.length > 0 ?
                correct() :
                wrong(`Your page must contain a header tag.`)
        }),
        // Test 2 - check main title font
        this.page.execute(() => {
            this.title = document.getElementById('main-title');
            let titleStyles = window.getComputedStyle(this.title);

            return titleStyles.fontSize === '18px' && titleStyles.fontWeight === '500' &&  titleStyles.fontFamily.indexOf('Inter') !== -1 ?
                correct() :
                wrong(`Check your main-title element font size, family and weight (we expect that you have connected the font Inter using GoogleFonts).`)
        }),
        // Test 3 - check main
        this.page.execute(() => {
            this.main = document.getElementsByTagName('main');

            return this.main.length > 0 ?
                correct() :
                wrong(`Your page should contain a main tag, which should contain the main content of the page.`)
        }),
        // Test 4 - check main width and height
        this.page.execute(() => {
            //TODO
            return correct();
        }),
        // Test 5 - check main margins
        this.page.execute(() => {
            let mainStyles = window.getComputedStyle(this.main[0]);

            return mainStyles.margin === "135px 90px 107px" ?
                correct() :
                wrong(`Please, check margins of your main tag.`)
        }),
        // Test 6 - check main flex
        this.page.execute(() => {
            //TODO
            return correct();
        }),
        // Test 7 - check video
        this.page.execute(() => {
            this.video = document.getElementsByTagName('video');

            return this.video.length > 0 ?
                correct() :
                wrong(`Your page should contain a video tag.`)
        }),
        // Test 8 - check video width
        this.page.execute(() => {
            //TODO
            return correct();
        }),
        // Test 9 - check main flex-wrap
        // Test 10 - check main flex-row-direction
        // Test 11 - check video flex-basis
        // Test 12 - check video flex-shrink
        // Test 13 - check video margin
        // Test 14 - check video object-fit
        // Test 15 - check aside
        // Test 16 - check aside flex-basis and flex-shrink
        // Test 17 - check .movie-title .name font and color
        // Test 18 - check .rating
        // Test 19 - check .sub-info
        // Test 20 - check .description
        // Test 21 - check table
        // Test 22 - check buttons

    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
