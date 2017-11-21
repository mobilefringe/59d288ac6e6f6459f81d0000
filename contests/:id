<style>
    .event-image{
        text-align:center;
        position:relative;
        width:100%;
        height:500px;
    }
    .event-image img {
         max-height: 100%;  
        max-width: 100%; 
        width: auto;
        height: auto;
        position: absolute;  
        top: 0;  
        bottom: 0;  
        left: 0;  
        right: 0;  
        margin: auto;
    }
    .store_header_btns{
        margin:0px;
    }
    @media(max-width: 768px){
        .event-image{
            height:300px;
        }
       
    }
</style>
<div class="content_container hidden_phone position_relative">
    <div class="flexslider banner_header">
        <!--<ul class="slides" id="banner_header">-->
        <!--    <script id="banner_header_template" type="x-tmpl-mustache/text">-->
        <!--        <li>-->
        <!--            <a class="banner_image_li" href="{{url}}" {{css}} onclick="{{noLink}}" >-->
        <!--                <img src="{{image_url}}"  class="{{gif_class}}"/>-->
        <!--            </a>-->
        <!--        </li>-->
        <!--    </script>-->
        <!--</ul>-->
        <img src="http://assets.codecloudapp.com/sites/59d288ac6e6f6459f81d0000/image/png/1506979423000/banner_placeholder.png" class="" alt="">
        <div class="banner_overlay"></div>
    </div>
    <div class="main_container position_relative">
        <div class="banner_header_title ">
            Contests
        </div>
        <div class="banner_header_location  ">
            Home / Contests
        </div>
    </div>
</div>
<div class="content_container main_container mobile_padding padding_bottom_50">
    <h4 class="promo_main_header show_phone">Contests</h4>
    <div class="margin_25_across">
        <div class="row">
            <div class="col-md-12">
                <div id="events_not_empty_section">
                    <div class="" id="contest_container">
                        <script id="contest_template" type="x-tmpl-mustache">
                            <div class="promo-details">
                                
                                <div class="event-image">
                                    <img class="contest banner" src="{{alt_photo_url}}">
                                </div>
                                <br>
                                <div class="event-description">
                                    {{{ rich_description }}}
                                </div>
                                <br>
                            </div> 
                            <form id="contest_form">
                                <input id="property_id" name="contest[property_id]" type="hidden" value="{{property_id}}"/>
                                <input id="contest_id" name="contest[contest_id]" type="hidden"  value="{{id}}" />
                                <input type="hidden" name="cm-name" id="cm-name" />
                                <div class="row ">
                                    <div class="col-md-4 margin_30">
                                        <label for="first_name">First Name</label>  
                                        <input class="form-control" id="first_name" name="contest[first_name]" type="text" required data-validation="required" tabindex="1"/>
                                    </div>
                                    <div class="col-md-4 margin_30">
                                        <label for="last_name">Last Name</label>  
                                        <input class="form-control" id="last_name" name="contest[last_name]" type="text" required data-validation="required" tabindex="2"/>
                                    </div>
                                    <div class="col-md-4 margin_30">
                                        <label for="phone">Phone Number</label>  
                                        <input class="form-control" id="phone" name="contest[phone]" type="text" required data-validation="required" tabindex="3"/>    
                                    </div>
                                </div>
                                <br class="hidden_phone">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label for="postal_code">Postal Code</label>  
                                        <input class="form-control" id="postal_code" name="contest[postal_code]" type="text" required data-validation="required" tabindex="4"/>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="city">City</label>  
                                        <input class="form-control" id="city" name="contest[city]" type="text" required data-validation="required" tabindex="5"/>    
                                    </div>
                                    <div class="col-md-4">
                                        <label for="email">Email</label> 
                                        <input class="form-control" id="email" name="contest[email]" type="email" required data-validation-regexp="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" data-validation-error-msg="Please enter a valid email address" data-validation="custom" tabindex="6"/>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="agree">
                                            <input id="newsletter_signup" type="checkbox" name="contest[newsletter]" tabindex="7"/> 
                                            Yes, I would like to receive information about events and promotions from Yuba Sutter Mall.
                                        </label>
                                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <a class="contest_link" href="/pages/yubasutter-rules-regulations" target="_blank" tabindex="8">Click here</a> to view the rules and regulations.
                                        <br/><br/>
                                        <button class=" store_header_btns" tabindex="9">Submit</button>
                                        <br/><br/>
                                    </div>
                                    <div id="success_subscribe_popup" class="hidden_now">
                                        <div class="alert alert-success fade in" style="margin-top:18px;">
                                            <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>
                                            <strong>Success!</strong> Thank you, your entry has been received.
                                        </div>
                                    </div>
                                    <div id="error_subscribe_popup" class="hidden_now">
                                        <div class="alert alert-error fade in" style="margin-top:12px;">
                                            <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>
                                            <strong>Sorry!</strong> There was a problem submiting your request. Please try again later!
                                        </div>
                                    </div>
                                    <br/><br/>
                                </div>
                            </form>
                        </script>
                    </div>
                </div>
                <div id="events_empty_section" style="display:none;">
                    <p>Check back later for exciting contest details!</p>
                </div>
            </div>
        </div>  
    </div>
</div>
<script>
    $(document).ready(function(e) {
        init(e);
        function renderPageData(){
            var pathArray = window.location.pathname.split( '/' );
            var slug = pathArray[pathArray.length-1];
            console.log(slug);
            var contest_details = getContestBySlug(slug);
            console.log(contest_details);
            renderContest("#contest_container", '#contest_template', contest_details)

            // show_content();
            
            $.validate();
            
            $('#contest_form').submit(function(e){
                e.preventDefault();
                $('.contest_btn').prop('disabled', true);
                // submit_contest(slug);
                submit_contest($(this).serialize());
                // $('html, body').animate({scrollBottom : 0},800);
            });
        }
        
        function renderContest(container, template, collection){
            var item_list = [];
            var item_rendered = [];
            var template_html = $(template).html();
            Mustache.parse(template_html);   // optional, speeds up future uses
            console.log(collection);
            collection.alt_photo_url = getImageURL(collection.photo_url);
            collection.property_name = getPropertyDetails().name;
            var rendered = Mustache.render(template_html,collection);
            item_rendered.push(rendered);
            
            $(container).show();
            $(container).html(item_rendered.join(''));
        }

        loadMallDataCached(renderPageData);
    });
    $(window).load(function(e){
        show_content();
    });
</script>