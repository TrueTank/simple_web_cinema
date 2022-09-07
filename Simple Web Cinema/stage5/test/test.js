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
            await this.page.setViewport({width: 1440, height: 2776});
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
        this.page.execute(() => {
            this.articleObj = document.querySelectorAll('#reviews-list article');
            this.gradeObj = document.querySelectorAll('#reviews-list article .grade');
            return this.articleObj.length >= 3 && this.gradeObj.length >= 3 ?
                correct() :
                wrong(`Your page must contain at least 3 reviews with 3 grades.`)
        }),
        // Test 15 - check position of first reviews-list article
        this.node.execute(async () => {
            let coords = await this.page.evaluate(async () => {
                let obj = document.querySelector('#reviews-list article');
                return [obj.getBoundingClientRect().x, obj.getBoundingClientRect().y];
            });
            return coords[0] === 90 && Math.abs(coords[1] - 1390) < 5 ?
                correct() :
                wrong(`Please, check position of your first review.`)
        }),
        // Test 16 - check size of first reviews-list article
        this.node.execute(async () => {
            let width = await this.page.evaluate(async () => {
                let obj = document.querySelectorAll('#reviews-list article')[0];
                return obj.getBoundingClientRect().width
            });
            return width === 1018 ?
                correct() :
                wrong(`Please check the width of the element with review.`)
        }),

        // Test 17 - check transform-animation of button
        this.node.execute(async () => {
            const button = await this.page.findBySelector('button');
            await button.hover();
            sleep(500);
            const hoverButton = await this.page.findBySelector('button:hover');

            const styles = await hoverButton.getComputedStyles();

            return styles.transform === 'matrix(1, 0, 0, 1, 10, -10)' &&
            styles.boxShadow === 'rgb(0, 0, 0) -10px 10px 0px 0px' ?
                correct() :
                wrong(`Please check transform- and box-shadow-animation after button hovering.`)
        }),
        // Test 18 - check time of transform-animation of button
        this.node.execute(async () => {
            const b = await this.page.findAllBySelector('button');
            const button = b[1];
            await button.hover();
            const hoverButton = await this.page.findBySelector('button:hover');

            const styles = await hoverButton.getComputedStyles();

            return styles.transform !== 'matrix(1, 0, 0, 1, 10, -10)' &&
            styles.boxShadow !== 'rgb(0, 0, 0) -10px 10px 0px 0px' ?
                correct() :
                wrong(`Please check time of animation after button hovering.`)
        }),
        // Test 19 - check animation of actor
        this.node.execute(async () => {
            const actor = await this.page.findBySelector('#actors-list article');
            await actor.hover();
            sleep(500);
            const hoverButton = await this.page.findBySelector('#actors-list article:hover');

            const styles = await hoverButton.getComputedStyles();

            return styles.transform === 'matrix(1, 0, 0, 1, 10, -10)' &&
            styles.boxShadow === 'rgb(0, 0, 0) -10px 10px 0px 0px' ?
                correct() :
                wrong(`Please check transform- and box-shadow-animation after actor hovering.`)
        }),

        // Test 20 - check summary
        this.page.execute(() => {
            this.summary = document.querySelector('.reviews-summary');

            return this.summary ?
                correct() :
                wrong(`Your page should contain .reviews-summary element.`)
        }),
        // Test 21 - check border of summary
        this.page.execute(() => {
            let borderLeft = window.getComputedStyle(this.summary).borderLeft;
            return  borderLeft === '1px solid rgb(0, 0, 0)' ?
                correct() :
                wrong(`Please, check left border of your summary element.`)
        }),
        // Test 22 - check fonts of summary
        this.page.execute(() => {
            let rn = window.getComputedStyle(document.querySelector('.reviews-summary .reviews-number'));
            let rnp = window.getComputedStyle(document.querySelector('.reviews-summary .reviews-number.positive'));
            let rnn = window.getComputedStyle(document.querySelector('.reviews-summary .reviews-number.negative'));
            let rns = window.getComputedStyle(document.querySelector('.reviews-summary .reviews-number span'));

            let caption = window.getComputedStyle(document.querySelector('.reviews-summary .caption'));

            let flag = rn.fontSize === '30px' && rn.fontWeight === '500' && rn.color === 'rgb(0, 0, 0)' &&
            rnp.color === 'rgb(48, 207, 127)' && rnn.color === 'rgb(207, 48, 48)' &&
            rns.color === 'rgb(0, 0, 0)' && rns.fontSize === '16px' && rns.fontWeight === '400' && rns.opacity === '0.4' &&
            caption.fontSize === '16px' && caption.fontWeight === '400';

            return  flag ?
                correct() :
                wrong(`Please, check fonts of your summary element and child elements of it.`)
        }),
        // Test 23 - check internal positions of summary
        this.node.execute(async () => {
            let coords = await this.page.evaluate(async () => {
                let summary = document.querySelector('.reviews-summary').getBoundingClientRect();
                let rn1 = document.querySelectorAll('.reviews-summary .reviews-number')[0].getBoundingClientRect();
                let rn2 = document.querySelectorAll('.reviews-summary .reviews-number')[1].getBoundingClientRect();

                let caption1 = document.querySelectorAll('.reviews-summary .caption')[0].getBoundingClientRect();
                return [rn1.x, rn1.y-summary.y, rn2.x, rn2.y-summary.y, caption1.x, caption1.y-summary.y];
            });

            return coords[0] === 1269 && coords[2] === coords[0] && coords[4] === coords[0] &&
                coords[1] === 15 && coords[3] === 102 && coords[5] === 51
                ?
                correct() :
                wrong(`Please, check internal positions of your .review-summary element.`)
        }),

        // Test 24 - check sticky position of summary
        this.node.execute(async () => {
            const reviews = await this.page.findBySelector('#reviews-list');
            const styles = await reviews.getComputedStyles();
            let height = parseInt(styles.height.slice(0, -2)) / 2;
            await this.page.setViewport({width: 1440, height: Math.round(height)});
            const positions = await this.page.evaluate(async () => {
                let y1 = document.querySelector('.reviews-summary').getBoundingClientRect().y;
                window.scrollTo(0, document.body.scrollHeight);
                let y2 = document.querySelector('.reviews-summary').getBoundingClientRect().y;
                return [y1, y2];
            });

            return Math.abs(positions[0] - 1391) < 5 && Math.abs(positions[1]) < 5 ?
                correct() :
                wrong('Your summary element should "stick" to the top of the page when you scroll down.');
        })
    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
