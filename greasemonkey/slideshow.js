// ==UserScript==
// @name         Shuffle
// @namespace    http://art.com/
// @version      0.1
// @description  try to take over the world!
// @author       jwong
// @match        http://qa-pod.art.com/frameconfigurator/partnerframing.aspx
// @grant        none
// ==/UserScript==






(function() {
    'use strict';

    var selectedNumber=0;

    function checkWithRobot() {
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "https://robo-gallerist.firebaseio.com/picture.json", true);
      xhttp.send();
      xhttp.addEventListener("readystatechange", processRequest, false);
      function processRequest(e) {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var response = JSON.parse(xhttp.responseText);
          var numberString = response.number;
          if (selectedNumber!=numberString) {
              IFeelLucky2();
              selectedNumber = numberString;
          }
        }
      }
      //setTimeout(refresh, 1000);
    }

                function Buy2()
            {
                var upi = document.getElementById("lblUPI").innerHTML;
                var url = document.getElementById("lblBuyUrl").innerHTML;

                if (upi == null)
                {
                    alert("No UPI to buy");
                    return false;
                }

                if (upi.length == 0)
                {
                    alert("No UPI to buy");
                    return false;
                }

                window.open(url, "_blank", "height=800,width=800");

                return false;
            }

            function IFeelLucky2()
            {
                ClearLabels();

                var spinnerURL = "Images/loading_spinner_sml.gif";
                document.getElementById("imgFrame").src = spinnerURL;

                document.getElementById("lblLoading").style.color = "black";
                document.getElementById("lblLoading").innerHTML = "Configuring...";
                document.getElementById("lblLoading").style.display = "inline";

                var topMatWidth = GetRandomFloat(1, 5);
                var midMatWidth = (GetRandomFloat(25, 75) / 100.0).toFixed(2);
                var botMatWidth = (GetRandomFloat(25, 75) / 100.0).toFixed(2);
                //alert("I Feel Lucky! - random: " + randomNum);

                //APNUM

                $.ajax({
                    url:LoadAPNum(),
                    success:function()
                    {
                        //CONFIGS
                        $.ajax({
                            url:LoadPODConfigs(true),
                            success: function () {

                                $.ajax({
                                    url: setControlValues(topMatWidth, midMatWidth, botMatWidth),
                                    success: function () {

                                        LoadCustomFrame2();
                                    }
                                });

                            }
                        }) ;
                    }
                });


                return false;
            }

                function LoadCustomFrame2() {

                ClearLabels();

                var spinnerURL = "Images/loading_spinner_sml.gif";
                document.getElementById("imgFrame").src = spinnerURL;

                document.getElementById("lblLoading").style.color = "black";
                document.getElementById("lblLoading").innerHTML = "Loading...";
                document.getElementById("lblLoading").style.display = "inline";

                callAjaxService2();

                return false;
            }

            function callAjaxService2() {

                //var LoadCustomFrameURL = "http://dev-product-service.art-aws.com/v3/product/customframe";
                var LoadCustomFrameURL = "http://dynamic-product-service-dev.us-west-2.elasticbeanstalk.com/v3/product/customframe";
                var e = document.getElementById("ddlPartner");
                var partnerid = e.options[e.selectedIndex].value;

                var apnum = document.getElementById("txtAPNum").value;

                e = document.getElementById("ddlPODConfig");
                var podconfigid = e.options[e.selectedIndex].value;

                e = document.getElementById("ddlCrop");
                var crop = e.options[e.selectedIndex].value;

                e = document.getElementById("ddlMoulding");
                var mouldingid = e.options[e.selectedIndex].value;

                e = document.getElementById("ddlGlass");
                var glassid = e.options[e.selectedIndex].value;

                var nummats = "0";

                var hasTopMat = document.getElementById("chkTopMat").checked;
                var hasMiddleMat = document.getElementById("chkMiddleMat").checked;
                var hasBottomMat = document.getElementById("chkBottomMat").checked;

                e = document.getElementById("ddlTopMat");
                var topmatid = e.options[e.selectedIndex].value;


                var topmatleft = document.getElementById("txtTopMatLeft").value;
                var topmattop = document.getElementById("txtTopMatTop").value;
                var topmatright = document.getElementById("txtTopMatRight").value;
                var topmatbottom = document.getElementById("txtTopMatBottom").value;

                e = document.getElementById("ddlMidMat");
                var middlematid = e.options[e.selectedIndex].value;

                var middlematwidth = document.getElementById("txtMiddleMatWidth").value;

                e = document.getElementById("ddlBotMat");
                var bottommatid = e.options[e.selectedIndex].value;

                var bottommatwidth = document.getElementById("txtBottomMatWidth").value;

                if (hasTopMat) nummats = "1";
                if (hasMiddleMat) nummats = "2";
                if (hasBottomMat) nummats = "3";

                var URL = LoadCustomFrameURL + "?apnum=" + apnum + "&podconfigid=" + podconfigid + "&docrop=" + crop + "&mouldingid=" + mouldingid + "&glassid=" + glassid + "&nummats=" + nummats;


                if (hasTopMat)
                {
                    URL = URL + "&topmatid=" + topmatid + "&topmatleft=" + topmatleft + "&topmattop=" + topmattop + "&topmatright=" + topmatright + "&topmatbottom=" + topmatbottom;
                }

                if (hasMiddleMat)
                {
                    URL = URL + "&midmatid=" + middlematid + "&midmatwidth=" + middlematwidth;
                }
                if (hasBottomMat)
                {
                    URL = URL + "&botmatid=" + bottommatid + "&botmatwidth=" + bottommatwidth;
                }

                URL = URL + "&partnerid=" + partnerid + "&showTrace=1";


                document.getElementById("txtURL").value = URL;


                $.ajax({
                    type: "GET",
                    url: URL,
                    dataType: "text",
                    success: function(res) {
                        OnSuccess2(res);
                    },
                    failure: function(res) {
                        OnFailure(res);
                    },
                    error: function (res) {
                        OnError(res);
                    },
                    complete: function (data, status) {
                        OnComplete(res);
                    },

                });

            }
            function OnSuccess2(response) {
                document.getElementById("lblLoading").innerHTML = "Success.";

                var jsonObject = JSON.parse(response);

                //document.getElementById("txtResult").value = jsonObject.responseMessage;
                document.getElementById("txtResult").value = JSON.stringify(response);
                //alert("success");

                var e = document.getElementById("ddlImageType");
                var imagetype = e.options[e.selectedIndex].value;

                var lifestyleid = document.getElementById("txtLifestyleID").value;

                var ImageURL = jsonObject.configuredProduct.configuredProductData.Images[0].URL;
                ImageURL = ImageURL.replace("qa1-imgc.artprintimages.com", "qa1-imgsrc.art.com");
                ImageURL = ImageURL.replace("u-s-", "u-g-");
                ImageURL = ImageURL + "?w=500&h=500";

                if (imagetype == "0")
                {
                    ImageURL = ImageURL + "&p=0";
                }
                else if (imagetype == "1")
                {
                    ImageURL = ImageURL + "&p=1";
                }
                else if (imagetype == "2") {
                    ImageURL = ImageURL + "&lid=" + lifestyleid;
                }

                document.getElementById("imgFrame").src = ImageURL;

                var UPI = jsonObject.configuredProduct.configuredProductData['UPI'];
                document.getElementById("lblUPI").innerHTML = UPI;

                var Price = jsonObject.configuredProduct.framedPrice['Price'];

                document.getElementById("lblPrice").innerHTML = Price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');;

                var Title = jsonObject.configuredProduct.configuredProductData.CoreAttributes['Title'];
                document.getElementById("lblTitle").innerHTML = Title;
                document.querySelectorAll("td")[1].textContent="Robo-Gallerist recommends: \b\b" + Title;

                var Type = "Framed " + jsonObject.configuredProduct.configuredProductData.CoreAttributes.ProductType.Name;


                var Width = jsonObject.configuredProduct.configuredProductDimensions.frameOuterDimensionWidth;
                var Height = jsonObject.configuredProduct.configuredProductDimensions.frameOuterDimensionHeight;

                var widthfloat = parseFloat(Width);
                widthfloat = Math.round(widthfloat);

                var heightfloat = parseFloat(Height);
                heightfloat = Math.round(heightfloat);

                var SizeString = widthfloat + " x " + heightfloat;

                document.getElementById("lblProductType").innerHTML = SizeString + " " + Type;
                document.getElementById("lblSize").innerHTML = SizeString + " inches (outer frame size)";

                var Moulding = jsonObject.configuredProduct.configuredProductData.Components.MOULDING.Item.Title;

                var MouldingWidth = jsonObject.configuredProduct.configuredProductData.Components.MOULDING.Item.ItemWidth;
                var mouldingWidthfloat = parseFloat(MouldingWidth);
                mouldingWidthfloat = Math.round(mouldingWidthfloat * 100) / 100;

                document.getElementById("lblMoulding").innerHTML = "Moulding: " + Moulding + " (width: " + mouldingWidthfloat + ")";

                var Glass = jsonObject.configuredProduct.configuredProductData.Components.GLASS.Item.Title;
                document.getElementById("lblGlass").innerHTML = Glass;

                var URL = jsonObject.configuredProduct['productPageUrlArt'];
                document.getElementById("lblBuyUrl").innerHTML = URL;

                document.querySelectorAll("td")[1].textContent="Robo-Gallerist recommends: \b\b" + Title + " framed in " + Moulding;

                //showImage();
            }



    // hide everything
    document.body.style.background="#ffffff";
    document.body.style.visibility="none";



    // hide the partner skin
    document.getElementById("TDBackground").style.backgroundImage="";

    // show just the image result
    var items = document.querySelectorAll("td");
    var item;
    for (var i=0; i<items.length; i++) {
        if (i>=65 || i==59 || i==1) {
           items[i].style.display="block";
        } else {
            items[i].style.display="none";
        }
    }

    // change the page title
    item = items[1];
    item.textContent="Robo-Gallerist";
    item.style.fontSize="40px";

    // change the buy button
    item = items[59];
    item.style.textAlign="left";

    // load a new "recommendation" every n miliseconds
    function sleep(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function demo() {
       while (true) {
       IFeelLucky2();
       await sleep(40000);

       //checkWithRobot();
       //await sleep(1000);
    }
}



demo();

})();
