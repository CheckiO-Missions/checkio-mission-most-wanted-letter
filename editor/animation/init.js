//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        var $tryit;
        var tCanvas;
        var inText;
        var $textInput;
        var $textResult;

        function MWLAnimation() {
            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var thisVar = this;

            var explDom;
            var htmlText;

            this.createExplanation = function (dom, text, mwl, prefix) {

                explDom = dom;
                var res = (prefix ? 'Input<br>' : "") + '"' + thisVar.processText(text, mwl) + '"';
                explDom.html(res);
            };

            this.processText = function (text, mwl) {
                mwl = mwl.toLowerCase();
                var upperMwl = mwl.toUpperCase();
                htmlText = "";

                for (var i = 0; i < text.length; i++) {
                    var letter = text[i];
                    if (letter === mwl || letter === upperMwl) {
                        htmlText += '<span class="mwl">' + letter + '</span>';
                    }
                    else {
                        htmlText += letter;
                    }
                }
                return htmlText;
            };
        }


        var io = new extIO({
            animation: function($expl, data){
                var checkioInput = data.in;
                var rightResult = data.ext?data.ext.answer:undefined;

                if (!checkioInput || !rightResult){
                    return;
                }
                var canvas = new MWLAnimation();
                canvas.createExplanation($expl, checkioInput, rightResult, true);
            },
            tryit: function(this_e) {
                $tryit = this_e.extSetHtmlTryIt(this_e.getTemplate('tryit'));
                tCanvas = new MWLAnimation();
                $textInput = $tryit.find(".text-input");
                $textResult = $tryit.find(".text-result");

                $textResult.click(function () {
                    $textResult.toggleClass("invisible");
                    $textInput.toggleClass("invisible");
                });

                $tryit.find(".bn-check").click(function (e) {
                    inText = $textInput.val();
                    this_e.extSendToConsoleCheckiO(inText);
                    e.stopPropagation();
                    return false;
                });
            },
            retConsole:function (ret) {
                if (typeof(ret) === 'string') {
                    ret = ret.replace(/\'/g, "");
                }
                var htmlText;
                if (typeof ret === "string" && ret.length === 1) {
                    htmlText = tCanvas.processText(inText, ret);
                }
                else {
                    htmlText = inText;
                }
                $textResult.html(htmlText);
                $textResult.removeClass("invisible");
                $textInput.addClass("invisible");
                $tryit.find(".checkio-result").html("Result<br>" + JSON.stringify(ret));
            }
        });
        io.start();
    }
);
