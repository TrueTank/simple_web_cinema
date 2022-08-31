import path from 'path';
const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        // Test 1 - check main-title
        this.node.execute(async () => {
            await this.page.setViewport({width: 1440, height: 740});
            const title = await this.page.findBySelector('#main-title');
            return title ?
                correct() :
                wrong(`Your page must contain a main-title element.`)
        }),
        // Test 2 - check video
        this.page.execute(() => {
            this.video = document.getElementsByTagName('video');

            return this.video.length > 0 ?
                correct() :
                wrong(`Your page should contain a video tag.`)
        }),
        // Test 3 - check video position
        this.node.execute(async () => {
            let videoCoords = await this.page.evaluate(async () => {
                let video = document.getElementsByTagName('video')[0];
                return [video.getBoundingClientRect().x, video.getBoundingClientRect().y];
            });
            return videoCoords[0] === 90 && videoCoords[1] === 177 ?
                correct() :
                wrong(`Check position of video element.`);
        }),
        // Test 4 - check name
        this.page.execute(() => {
            this.nameEl = document.getElementsByClassName('name');

            return this.nameEl.length > 0 ?
                correct() :
                wrong(`Your page should contain a name element.`)
        }),
        // Test 5 - check description
        this.page.execute(() => {
            this.description = document.getElementsByClassName('description');

            return this.description.length > 0 ?
                correct() :
                wrong(`Your page should contain a description element.`)
        }),
        // Test 6 - check table
        this.page.execute(() => {
            this.table = document.getElementsByTagName('table');

            return this.table.length > 0 ?
                correct() :
                wrong(`Your page should contain a table tag.`)
        }),
        // Test 7 - check buttons
        this.page.execute(() => {
            this.buttons = document.getElementsByTagName('button');

            return this.buttons.length === 2 ?
                correct() :
                wrong(`Your page should contain 2 button elements.`)
        }),
        // Test 8 - check buttons position
        this.node.execute(async () => {
            let buttonCoords = await this.page.evaluate(async () => {
                let buttonEl1 = document.getElementsByTagName('button')[0];
                let buttonEl2 = document.getElementsByTagName('button')[1];
                return [buttonEl1.getBoundingClientRect().x, buttonEl1.getBoundingClientRect().y,
                    buttonEl2.getBoundingClientRect().x, buttonEl2.getBoundingClientRect().y];
            });
            return buttonCoords[0] === 955 && buttonCoords[1] === 625 &&
            buttonCoords[2] === 1170 && buttonCoords[3] === 625 ?
                correct() :
                wrong(`Check position of buttons element.`);
        }),
        //Test 9 - check section-header
        this.page.execute(() => {
            this.actorsHeader = document.querySelectorAll('.section-header');

            return this.actorsHeader.length === 2 ?
                correct() :
                wrong(`Your page should contain 2 .section-header elements.`)
        }),
        //Test 10 - check font section-header //TODO
        this.page.execute(() => {
            let actorsHeaderStyles = window.getComputedStyle(this.actorsHeader[0]);
            let reviewsHeaderStyles = window.getComputedStyle(this.actorsHeader[1]);
            return actorsHeaderStyles.fontSize === '32px' && actorsHeaderStyles.fontWeight === '700' &&
                actorsHeaderStyles.fontFamily.includes('Montserrat') && reviewsHeaderStyles.fontSize === "32px" &&
                reviewsHeaderStyles.fontWeight === '700' && reviewsHeaderStyles.fontFamily.includes('Montserrat')?
                correct() :
                wrong(`Check font of .section-header elements.`)
        }),
        //Test 11 - check position section-header
        this.node.execute(async () => {
            let ahCoords = await this.page.evaluate(async () => {
                let actors = document.getElementsByClassName('section-header')[0];
                let reviews = document.getElementsByClassName('section-header')[1];
                return [actors.getBoundingClientRect().x, actors.getBoundingClientRect().y,
                    reviews.getBoundingClientRect().x, reviews.getBoundingClientRect().y];
            });
            return ahCoords[0] === 90 && Math.abs(ahCoords[1] - 825) < 10 &&
            ahCoords[2] === 90 && Math.abs(ahCoords[3] - 1310) < 10 ?
                correct() :
                wrong(`Check position of actors-header element.`);
        }),
        //Test 12 - check article
        this.page.execute(() => {
            this.articleObj = document.querySelectorAll('#actors-list article');

            return this.articleObj.length === 7 ?
                correct() :
                wrong(`Your page should contain 7 article elements inside #actors-list element.`)
        }),
        //Test 13 - check first article position
        this.node.execute(async () => {
            let arCoords = await this.page.evaluate(async () => {
                let arObj = document.querySelector('#actors-list article');
                return [arObj.getBoundingClientRect().x, arObj.getBoundingClientRect().y];
            });
            return arCoords[0] === 90 && Math.abs(arCoords[1] - 905) < 10 ?
                correct() :
                wrong(`Check position of first article element.`);
        }),

        // Test 14 - check reviews-list article
        // Test 14 - check position of first reviews-list article
        // Test 15 - check position of second reviews-list article
        // Test 16 - check size of first reviews-list article
        // Test 17 - check position of first reviews-list article span
        // Test 18 - check position of first reviews-list article h1
        // Test 19 - check position of first reviews-list article p
        // Test 20 - check fonts of all elements of article

        // Test 21 - check position of first reviews-list article grade
        // Test 22 - check position of second reviews-list article grade
        // Test 23 - check background of first reviews-list article grade
        // Test 24 - check fonts of first reviews-list article grade
        // Test 25 - check size of first reviews-list article grade
        // Test 26 - check position inside first reviews-list article grade

        //Test 27 - check click on reviews-button
        this.node.execute(async () => {
            const reviewsButton = await this.page.findAllBySelector('button');
            await reviewsButton[1].click();
            let scrollTop = await this.page.evaluate(async () => {
                return document.querySelector('#reviews-section').getBoundingClientRect().y;
            });
            return  Math.round(scrollTop) === 0 ?
                correct() :
                wrong(`Make sure you don't forget to add a scroll to the reviews section when you click on the "Reviews" button`);
        }),
    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
