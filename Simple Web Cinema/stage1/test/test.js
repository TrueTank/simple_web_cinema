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
        // Test 2 - check main-title
        this.page.execute(() => {
            this.title = document.getElementById('main-title');

            return this.title ?
                correct() :
                wrong(`Your page must contain an element with "main-title" id.`)
        }),
        // Test 3 - check login-button
        this.page.execute(() => {
            this.loginButton = document.getElementById('login-button');

            return this.loginButton ?
                correct() :
                wrong(`Your page must contain an element with "login-button" id.`)
        }),
        // Test 4 - check header margins
        this.page.execute(() => {
            let headerStyles = window.getComputedStyle(this.header[0]);

            return headerStyles.marginTop === '20px' && headerStyles.marginLeft === '90px'?
                correct() :
                wrong(`Check your header's margins, you have ${headerStyles.marginTop} from the top and ${headerStyles.marginLeft} from the left now.`)
        }),
        // Test 5 - check main title font
        this.page.execute(() => {
            let titleStyles = window.getComputedStyle(this.title);

            return titleStyles.fontSize === '18px' && titleStyles.fontWeight === '500' &&  titleStyles.fontFamily.indexOf('Inter') !== -1 ?
                correct() :
                wrong(`Check your main-title element font size, family and weight (we expect that you have connected the font Inter using GoogleFonts).`)
        }),

        // Test 6 - check body background-color
        this.page.execute(() => {
            let bodyStyles = window.getComputedStyle(document.body);

            return bodyStyles.backgroundColor === 'rgb(242, 235, 255)' ?
                correct() :
                wrong(`Check background-color of body.`)
        }),

        // Test 7 - check body margins
        this.page.execute(() => {
            let bodyStyles = window.getComputedStyle(document.body);

            return bodyStyles.margin ?
                correct() :
                wrong(`Make sure the body of your page has no margins.`)
        }),

        // Test 8 - check login-button font
        this.page.execute(() => {
            let loginStyles = window.getComputedStyle(this.loginButton);

            return loginStyles.fontSize === '16px' && loginStyles.fontWeight === '500' && loginStyles.opacity === '0.8' &&
                loginStyles.fontFamily.includes('Inter') ?
                correct() :
                wrong(`Check your login-button element font size, weight, family and opacity (we expect that you have connected the font Inter using GoogleFonts).`)
        }),
        // Test 9 - check header width
        this.page.execute(() => {
            //TODO
            return correct();
        }),
        // Test 10 - check login float
        this.page.execute(() => {
            //TODO
            return correct();
        }),
        // Test 11 - check main
        this.page.execute(() => {
            this.main = document.getElementsByTagName('main');

            return this.main.length > 0 ?
                correct() :
                wrong(`Your page should contain a main tag, which should contain the main content of the page.`)
        }),
        // Test 12 - check main width and height
        this.page.execute(() => {
            //TODO
            return correct();
        }),
        // Test 13 - check main margins
        this.page.execute(() => {
            let mainStyles = window.getComputedStyle(this.main[0]);

            return mainStyles.margin === "135px 90px 107px" ?
                correct() :
                wrong(`Please, check margins of your main tag.`)
        }),
        // Test 14 - check main flex
        this.page.execute(() => {
            //TODO
            return correct();
        }),
        // Test 15 - check video
        this.page.execute(() => {
            this.video = document.getElementsByTagName('video');

            return this.video.length > 0 ?
                correct() :
                wrong(`Your page should contain a video tag.`)
        }),
        // Test 16 - check video border
        this.page.execute(() => {
            let videoStyles = window.getComputedStyle(this.video[0]);

            return videoStyles.border === "1px solid rgb(0, 0, 0)" && videoStyles.borderRadius === "10px" ?
                correct() :
                wrong(`Please, check border of your video tag.`)
        }),
        // Test 17 - check video width
        this.page.execute(() => {
            //TODO
            return correct();
        }),
        // Test 18 - check video poster and controls
        this.page.execute(() => {
            return this.video[0].controls && this.video[0].poster ?
                correct() :
                wrong(`Check if you have controls enabled for the video element and if a poster has been added.`)
        }),
    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
