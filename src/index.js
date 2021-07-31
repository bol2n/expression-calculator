function eval() {
    // Do not use eval!!!
    return;
}

	function expressionCalculator(expr) {
					//summation operation
					const funcSum = (expression) => {
						let arrSum = expression.reduce((sum, current) => sum + current);
						return arrSum;
					}
					//subtraction operation
					const funcSub = (expression) => {
						let arrSub = expression.reduce((sub, current) => sub - current);
						return arrSub;
					}
					//multiplication operation
					const funcMult = (expression) => {
						let arrMult = expression.reduce((mult, current) => mult * current);
						return arrMult;
					}
					//division operation
					const funcDiv = (expression) => {
						let arrDiv = expression.reduce((div, current) => {
							if (current == 0) {
								throw ("TypeError: Division by zero.");
							}
							else {
								return div / current;
							}
						});
						return arrDiv;
					}
					//calculator
					const exprCalc = (expression) => {
						//divide by terms
						let sumArr = expression.split('+');
						//divide by deductions
						let subArr = sumArr.map(item => item.split('-'));
						for (i = 0; i < subArr.length; i++) {
							for (k = 0; k < subArr[i].length; k++) {
								//if we have multiplication and/or division
								if (subArr[i][k].includes('*' && "/")) {
									if (subArr[i][k].includes("M")) {
										subArr[i][k] = subArr[i][k].replace(/\M/g,'-');
									}
									let multArr = subArr[i][k].split('*');
									for (l = 0; l < multArr.length; l++ ) {
										if (multArr[l].includes('/')) {
											if (multArr[l].includes("M")) {
												multArr[l] = multArr[l].replace(/\M/g,'-');
											}
											let elemDiv = funcDiv(multArr[l].split('/'));
											multArr.splice(l, 1, elemDiv);
										}
									}
									let elemMult = funcMult(multArr);
									subArr[i].splice(k, 1, elemMult);
								}
								else if	(subArr[i][k].includes('*')) {
									if (subArr[i][k].includes("M")) {
										subArr[i][k] = subArr[i][k].replace(/\M/g,'-');
									}
									let elemMult = funcMult(subArr[i][k].split('*'));
									subArr[i].splice(k, 1, elemMult);
								}
								else if	(subArr[i][k].includes('/')) {
									let elemDiv = funcDiv(subArr[i][k].split('/'));
									subArr[i].splice(k, 1, elemDiv);
								}
								else {
								}
							}
							if (subArr[i].length > 1) {
								subArr[i] = funcSub(subArr[i]);
							}
							else {
								subArr[i] = +subArr[i];
							}
						}

						let result = funcSum(subArr);
						return result;
					}
					//check for paired brackets
					const pairedBr = (expression) => {
						let openStack = [];
						let closeStack = [];
						for (i = 0; i < expression.length; i++) {
							if (expression.charAt(i) == '(') {
								openStack.push(expression['(']);
							}
							else if (expression.charAt(i) == ')')	{
								closeStack.push(expression[')']);
							}
							else {
							}
						}
						if (openStack.length != closeStack.length) {
							throw ('ExpressionError: Brackets must be paired')
						}
						else if (openStack.length = closeStack.length && openStack.length == '1') {
						}
						else {
						}
					}
					//calculator inside brackets
					const calcExpr = (expression) => {
						let secondBr = expression.indexOf(')');
						let firstBr = expression.lastIndexOf('(',secondBr)+1;
						let oldStr = expression.substring(firstBr-1, secondBr+1);
						let newStr = exprCalc(expression.substring(firstBr, secondBr));
						let strBr = expression.split(oldStr).join(newStr);
						return strBr;
					}

					//remove spaces from string
					let str = expr.replace(/\s/g,'');
					//check for brackets
					if (str.indexOf('(') == -1 && str.indexOf(')') == -1) {
						return exprCalc(str);
					}
					//if have brackets
					else {
						let openStack = [];
						let closeStack = [];
						for (i = 0; i < str.length; i++) {
							if (str.charAt(i) == '(') {
								openStack.push(str['(']);
							}
							else if (str.charAt(i) == ')')	{
								closeStack.push(str[')']);
							}
							else {
							}
						}
						//if have unpaired brackets
						if (openStack.length !== closeStack.length) {
							throw ('ExpressionError: Brackets must be paired')
						}
						//if have one pair of brackets
						else if (openStack.length = closeStack.length && openStack.length == '1') {
							let startPos = str.indexOf('(')+1;
							let closePos = str.indexOf(')');
							let oldStr = str.substring(startPos-1, closePos+1);
							let newStr = exprCalc(str.substring(startPos, closePos));
							let strBr = str.split(oldStr).join(newStr)
							if (strBr.includes('*-')) {
								strBr = strBr.replace(/\*\-/,'*M');
								return exprCalc(strBr);
							}
							else if (strBr.includes('/-')) {
								strBr = strBr.replace(/\/\-/,'/M');
								return exprCalc(strBr);
							}
							else if (strBr.includes('*+')) {
								strBr.replace(/\*\+/,'*');
								return exprCalc(strBr);
							}
							else if (strBr.includes('/+')) {
								strBr = strBr.replace(/\/\+/,'/');
								return exprCalc(strBr);
							}
							else {
								return exprCalc(strBr);
							}
						}
						//if have more than one pair
						else {
							if (str.indexOf('(') == -1) {
							}
							else {
								while (str.indexOf('(') !== -1) {
									let secondBr = str.indexOf(')');
									let firstBr = str.lastIndexOf('(',secondBr)+1;
									let oldStr = str.substring(firstBr-1, secondBr+1);
									let newStr = exprCalc(str.substring(firstBr, secondBr));
									let strBr = str.split(oldStr).join(newStr);
									if (strBr.includes('*-')) {
										strBr = strBr.replace(/\*\-/,'*M');
									}
									else if (strBr.includes('/-')) {
										strBr = strBr.replace(/\/\-/,'/M');
									}
									else if (strBr.includes('*+')) {
										strBr.replace(/\*\+/,'*');
									}
									else if (strBr.includes('/+')) {
										strBr = strBr.replace(/\/\+/,'/');
									}
									else if (strBr.includes('--')) {
										strBr = strBr.replace(/\-\-/,'+');
									}
									else {
									}
									str = strBr;
								}
							}
							return exprCalc(str);
						}
					}
				}

module.exports = {
    expressionCalculator
}