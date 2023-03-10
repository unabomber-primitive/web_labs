"use strict";

class Application {
    rValue = document.getElementById('user-request:r-value')

    resultsTable = document.getElementById("results-content");
    animations = new AnimationProcessor();

    constructor() {
        this.initRValue();
    }

    getXValue() {
        console.log("parsedX: " + $('input[name="user-request:x-value"]:checked').val());
        return $('input[name="user-request:x-value"]:checked').val();
    }

    getYValue() {
        return document.getElementById('user-request:y-value').value;
    }

    getRValue() {
        return document.getElementById('user-request:r-value').value;
    }

//    initRValues() {
//        let buttons = document.getElementsByClassName('r');
//        buttons[Math.floor(Math.random() * buttons.length)].click();
//        console.log("Send click")
//    }

    initRValue() {
        document.getElementById('user-request:r-value').value = 2;
        console.log("Init r")
    }

    changeRProcess() {
        onChangeRValue();
    }
//    changeRProcess() {
//        let buttons = document.getElementsByClassName('r');
//        let rValue = parseFloat(this.getRValue());
//        console.log("Cur R value: " + rValue);
//
//        Array.from(buttons).forEach(btn => {
//            if (parseFloat(btn.innerHTML) == rValue) {
//                btn.style.color = "#4b61cf";
//            } else {
//                btn.style.color = "gray";
//            }
//        });
//
//        onChangeRValue();
//    }

//    validateX(x) {
//        const xMin = -3., xMax = 3.;
//
//        let parsedX = parseFloat(x.replace(",", "."));
//        if (parsedX < xMin || parsedX > xMax) {
//            this.showErrorMessage("Please, choose correct X value (from -3 to 3)");
//            return null;
//        }
//
//        return parsedX
//    }

    validateX(x, showMessage=true) {
        //const xValues = [-2., -1.5, -1., -0.5, 0., 0.5, 1., 1.5];
        const xMin = -2., xMax = 1.5;

        let parsedX = parseFloat(x);

        //if (isNaN(x.trim()) || isNaN(parsedX) || !xValues.includes(parsedX)) {
        if (isNaN(x.trim()) || isNaN(parsedX)) {
            if (showMessage) this.showErrorMessage("Please, choose X value!");
            return null;
        } else if (parsedX < xMin || parsedX > xMax) {
            this.showErrorMessage("Please, choose correct X value (from -2 to 1.5)");
            return null;
        }
        return parsedX;
    }

    validateY(y) {
        const yMin = -5., yMax = 3.;

        let parsedY = parseFloat(y.replace(",", "."));
        if (yMin >= parsedY || parsedY >= yMax) {
            this.showErrorMessage("Please, choose correct Y value (from -5 to 3)");
            return null;
        }

        return parsedY;
    }

    validateR(r) {
            const rMin = 1., rMax = 4.;

            let parsedR = parseFloat(r.replace(",", "."));
            if (rMin >= parsedR || parsedR >= rMax) {
                this.showErrorMessage("Please, choose correct R value (from 1 to 4)");
                return null;
            }

            return parsedR;
        }

//    validateR(r, showMessage=true) {
//        const rValues = [1., 1.5, 2., 2.5, 3.];
//
//        let parsedR = parseFloat(r);
//        if (isNaN(r.trim()) || isNaN(parsedR) || !rValues.includes(parsedR)) {
//            if (showMessage) this.showErrorMessage("Please, choose R value!");
//            return null;
//        }
//
//        return parsedR;
//    }

	validate(x = null, y = null, r = null) {
	    if (!x || !y || !r) {
	        x = this.getXValue();
	        y = this.getYValue();
	        r = this.getRValue();
		}
		let parsedX, parsedY, parsedR;

        console.log(x, y, r);

        parsedX = this.validateX(x)
        if (parsedX == null) return false;

		parsedY = this.validateY(y);
		if (parsedY == null) return false;

		parsedR = this.validateR(r);
		if (parsedR == null) return false;

		return true;
	}

    processRequest(x = null, y = null, r = null) {
        console.log("Start process request");

        if (!this.validate(x, y, r)) return;

        try {
            let promise;
            if (!x || !y || !r) {
                promise = makeUserRequest();
            } else {
                let requestParams = [{name: 'x', value: x}, {name: 'y', value: y}, {name: 'r', value: r}];
                promise = makeRemoteRequest(requestParams);
            }
            // TODO animation
            // promise.then(data => { updatePoints(); })
            //    .catch(error => { console.error("Request failed", error);});
        } catch (e) {
            console.log(e)
        }
    }

    async clearResults() {
        try {
            const response = await fetch("./controller?" + new URLSearchParams({session: "clear"}));
            const json = await response.json();

            if (response.status == 200) {
                // Remove results from table
                $("#results-table tbody tr").remove();
                // Recreate board
                board = initBoard();
                // Draw current figures
                if (getRValue()) {
                    // TODO
                    this.components.r.dispatchEvent(new Event('change'));
                }
            } else {
                this.showErrorMessage(json.error);
            }

            this.setRequestsCounter(json.requestsCount);
        } catch (error) {
            console.log(error);
            this.showErrorMessage("Server unreachable :(\nTry again later");
        }
    }

    setRequestsCounter(newValue) {
        $("#requests-counter").text(newValue);
    }

    showErrorMessage(message) {
        $("#error-message-block").show();
        $("#error-message").text(message);
    }

    hideErrorMessage() {
        $("#error-message-block").hide();
    }
}

const app = new Application();