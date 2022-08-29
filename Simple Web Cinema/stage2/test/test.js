import path from 'path';
const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

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
        // Test 2 - check login-button
        this.page.execute(() => {
            this.loginButton = document.getElementById('login-button');

            return this.loginButton ?
                correct() :
                wrong(`Your page must contain an element with "login-button" id.`)
        }),
        // Test 3 - check main title position
        this.node.execute(async () => {
            let titleCoords = await this.page.evaluate(async () => {
                let titleObj = document.getElementById('main-title');
                return [titleObj.getBoundingClientRect().x, titleObj.getBoundingClientRect().y];
            });
            return titleCoords[0] === 90 && titleCoords[1] === 20 ?
                correct() :
                wrong(`Check float and position of main-title element.`);
        }),
        // Test 4 - check login position
        this.node.execute(async () => {
            let loginCoords = await this.page.evaluate(async () => {
                let loginObj = document.getElementById('login-button');
                return [loginObj.getBoundingClientRect().x + loginObj.getBoundingClientRect().width, loginObj.getBoundingClientRect().y];
            });

            return loginCoords[0] === 1350 && loginCoords[1] === 20 ?
                correct() :
                wrong(`Check float and position of login-button.`);
        }),
        // Test 5 - check video
        this.page.execute(() => {
            this.video = document.getElementsByTagName('video');

            return this.video.length > 0 ?
                correct() :
                wrong(`Your page should contain a video tag.`)
        }),
        // Test 6 - check video position
        this.node.execute(async () => {
            let videoCoords = await this.page.evaluate(async () => {
                let video = document.getElementsByTagName('video')[0];
                return [video.getBoundingClientRect().x, video.getBoundingClientRect().y];
            });
            return videoCoords[0] === 90 && videoCoords[1] === 177 ?
                correct() :
                wrong(`Check position of video element.`);
        }),
        // Test 7 - check video width and height
        this.node.execute(async () => {
            let videoWidth = await this.page.evaluate(async () => {
                let video = document.getElementsByTagName('video')[0];
                return [video.getBoundingClientRect().width, video.getBoundingClientRect().height];
            });

            return videoWidth[0] === 828 && Math.round(videoWidth[1]) === 500 ?
                correct() :
                wrong(`Check size of video element.`);
        }),

        // Test 8 - check name
        this.page.execute(() => {
            this.nameEl = document.getElementsByClassName('name');

            return this.nameEl.length > 0 ?
                correct() :
                wrong(`Your page should contain a name element.`)
        }),
        // Test 9 - check name font
        this.page.execute(() => {
            let nameStyles = window.getComputedStyle(this.nameEl[0]);

            return nameStyles.fontWeight === "900" && nameStyles.fontSize === "40px" &&
                nameStyles.fontFamily.includes('Montserrat') && nameStyles.color === "rgb(0, 0, 0)" ?
                correct() :
                wrong(`Please, check font of name element.`)
        }),
        // Test 10 - check name position
        this.node.execute(async () => {
            let nameCoords = await this.page.evaluate(async () => {
                let nameEl = document.getElementsByClassName('name')[0];
                return [nameEl.getBoundingClientRect().x, nameEl.getBoundingClientRect().y];
            });
            return nameCoords[0] === 955 && nameCoords[1] === 177 ?
                correct() :
                wrong(`Check position of name element.`);
        }),

        // Test 11 - check rating
        this.page.execute(() => {
            this.rating = document.getElementsByClassName('rating');

            return this.rating.length > 0 ?
                correct() :
                wrong(`Your page should contain a rating element.`)
        }),
        // Test 12 - check rating font
        this.page.execute(() => {
            this.ratingStyles = window.getComputedStyle(this.rating[0]);

            return this.ratingStyles.fontSize === "20px" && this.ratingStyles.fontFamily.includes('Montserrat')
            && this.ratingStyles.color === "rgb(0, 0, 0)" ?
                correct() :
                wrong(`Please, check font of rating element.`)
        }),
        // Test 13 - check rating position
        this.node.execute(async () => {
            let ratingCoords = await this.page.evaluate(async () => {
                let ratingEl = document.getElementsByClassName('rating')[0];
                return [ratingEl.getBoundingClientRect().x, ratingEl.getBoundingClientRect().y];
            });
            return Math.abs(ratingCoords[0]- 1086) < 15 && ratingCoords[1] === 187 ?
                correct() :
                wrong(`Check position of name element.`);
        }),
        // Test 14 - check rating border
        this.page.execute(() => {
            return this.ratingStyles.border === "1px solid rgb(187, 184, 192)" && this.ratingStyles.borderRadius === "6px" ?
                correct() :
                wrong(`Please, check border of rating element.`)
        }),
        // Test 15 - check rating size
        this.page.execute(() => {
            return this.ratingStyles.width === "44px" && this.ratingStyles.height === "29px" ?
                correct() :
                wrong(`Please, check size of rating element.`)
        }),

        // Test 16 - check sub-info
        this.page.execute(() => {
            this.subInfo = document.getElementsByClassName('sub-info');

            return this.subInfo.length > 0 ?
                correct() :
                wrong(`Your page should contain a sub-info element.`)
        }),
        // Test 17 - check sub-info font
        this.page.execute(() => {
            this.subInfoStyles = window.getComputedStyle(this.subInfo[0]);

            return this.subInfoStyles.fontWeight === "300" && this.subInfoStyles.fontFamily.includes('Inter')
            && this.subInfoStyles.fontSize === "14px" &&  this.subInfoStyles.opacity === "0.6"?
                correct() :
                wrong(`Please, check font and opacity of sub-info element.`)
        }),
        // Test 18 - check sub-info position
        this.node.execute(async () => {
            let subInfoCoords = await this.page.evaluate(async () => {
                let subInfoEl = document.getElementsByClassName('sub-info')[0];
                return [subInfoEl.getBoundingClientRect().x, subInfoEl.getBoundingClientRect().y];
            });
            return subInfoCoords[0] === 955 && subInfoCoords[1] === 236 ?
                correct() :
                wrong(`Check position of sub-info element.`);
        }),

        // Test 20 - check description
        this.page.execute(() => {
            this.description = document.getElementsByClassName('description');

            return this.description.length > 0 ?
                correct() :
                wrong(`Your page should contain a description element.`)
        }),
        // Test 21 - check description font
        this.page.execute(() => {
            this.descriptionStyles = window.getComputedStyle(this.description[0]);

            return this.descriptionStyles.fontWeight === "400" && this.descriptionStyles.fontFamily.includes('Inter')
            && this.descriptionStyles.fontSize === "18px" ?
                correct() :
                wrong(`Please, check font of sub-info element.`)
        }),
        // Test 22 - check description position
        this.node.execute(async () => {
            let descriptionCoords = await this.page.evaluate(async () => {
                let descriptionEl = document.getElementsByClassName('description')[0];
                return [descriptionEl.getBoundingClientRect().x, descriptionEl.getBoundingClientRect().y];
            });
            return descriptionCoords[0] === 955 && descriptionCoords[1] === 283 ?
                correct() :
                wrong(`Check position of description element.`);
        }),

        // Test 23 - check table
        this.page.execute(() => {
            this.table = document.getElementsByTagName('table');

            return this.table.length > 0 ?
                correct() :
                wrong(`Your page should contain a table tag.`)
        }),
        // Test 24 - check table font
        this.page.execute(() => {
            this.tableStyles = window.getComputedStyle(this.table[0]);

            return this.tableStyles.fontWeight === "400" && this.tableStyles.fontFamily.includes('Inter')
            && this.tableStyles.fontSize === "16px" ?
                correct() :
                wrong(`Please, check font of table element.`)
        }),
        // Test 25 - check table position
        this.node.execute(async () => {
            let tableCoords = await this.page.evaluate(async () => {
                let tableEl = document.getElementsByTagName('table')[0];
                return [tableEl.getBoundingClientRect().x, tableEl.getBoundingClientRect().y];
            });
            return tableCoords[0] === 955 && tableCoords[1] === 402 ?
                correct() :
                wrong(`Check position of table element.`);
        }),
        // Test 26 - check table headers styles
        this.page.execute(() => {
            let evenTds = document.querySelectorAll('th');

            let correctFlag = true;
            for (let td of evenTds) {
                if(window.getComputedStyle(td).fontWeight !== '600') {
                    correctFlag = false;
                }
            }

            return correctFlag ?
                correct() :
                wrong(`Please, check font of header's column in table.`)
        }),

        // Test 27 - check buttons
        this.page.execute(() => {
            this.buttons = document.getElementsByTagName('button');

            return this.buttons.length === 2 ?
                correct() :
                wrong(`Your page should contain 2 button elements.`)
        }),
        // Test 28 - check buttons font
        this.page.execute(() => {
            this.buttonStyles = window.getComputedStyle(this.buttons[0]);

            return this.buttonStyles.fontWeight === "700" && this.buttonStyles.fontFamily.includes('Inter')
            && this.buttonStyles.fontSize === "16px" && this.buttonStyles.color === "rgb(130, 45, 180)" ?
                correct() :
                wrong(`Please, check font of button element.`)
        }),
        // Test 29 - check buttons position
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
        // Test 30 - check buttons border
        this.page.execute(() => {
            return this.buttonStyles.border === "1px solid rgb(130, 45, 180)" && this.buttonStyles.borderRadius === "8px" ?
                correct() :
                wrong(`Please, check border of button element.`)
        }),
        // Test 31 - check buttons size
        this.page.execute(() => {
            return this.buttonStyles.width === "180px" && this.buttonStyles.height === "50px" ?
                correct() :
                wrong(`Please, check size of button element.`)
        }),
        // Test 32 - check hover buttons
        this.node.execute(async () =>{
            const button = await this.page.findBySelector('button');
            await button.hover();
            let style = await button.getComputedStyles();
            return style.backgroundColor === 'rgb(130, 45, 180)' && style.color === 'rgb(255, 255, 255)' ?
                correct() :
                wrong(`Check hover-effect of buttons.`);
        }),
        // Test 33 - check height of table rows
        this.page.execute(() => {
            this.tableTdStyles = window.getComputedStyle(document.getElementsByTagName('td')[0]);

            return this.tableTdStyles.height === '45px' ?
                correct() :
                wrong(`Please, check height of table cell.`)
        }),

    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
