/*Created 2015-02-28 by CodeCloud Team*/

function renderBanner(banner_template,home_banner,banners){
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    $.each( banners , function( key, val ) {
        today = new Date();
        start = new Date (val.start_date);
        start.setDate(start.getDate());
        if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
        }
        if (start <= today){
            if (val.end_date){
                end = new Date (val.end_date);
                end.setDate(end.getDate() + 1);
                if (end >= today){
                    item_list.push(val);  
                }
            } else {
                item_list.push(val);
            }
        }
    });
    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(banner_template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(home_banner).html(item_rendered.join(''));
}

function renderMobileBanner(mobile_banner_template, mobile_banner, images){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(mobile_banner_template).html();
    $.each(images, function(key, val) {
        var rendered = Mustache.render(template_html, val);
        item_rendered.push(rendered);
    });
    $(mobile_banner).html(item_rendered.join(''));
}

function renderFeatureItems(container, template, collection){
    // var item_list = [];
    // var item_rendered = [];
    // var template_html = $(template).html();
    // Mustache.parse(template_html); 
    // $.each( collection , function( key, val ) {
    //     if(val.url == "" || val.url === null){
    //       val.css = "style=cursor:default;";
    //       val.noLink = "return false";
    //     }
    //     var repo_rendered = Mustache.render(template_html,val);
    //     item_rendered.push(repo_rendered);
    // });
    // $(container).html(item_rendered.join(''));
    // var items = getFeatureList();
    $.each(collection, function(i, val){
        $('#feature_' + i).html('<div class="feature_item wow animated flipInX animated"><a href="'+ val.url +'"><img src='+ val.image_url+'"> <div class="hover_see_more_btn"><h5 class="hover_text">'+ val.name +'</h5></div></a></div>');
        // <a href="{{url}}">
                        // <figure style="background-image:url('{{image_url}}')"></figure>
                        // <div class="hover_see_more_btn">
                        //     <h5 class="hover_text">{{name}} </h5>
                        // </div>
                    // </a>
    })
}

function renderPromotions(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.image_url = store_details.store_front_url_abs;
            if(store_details.categories !=null && store_details.categories!== undefined){
                val.cat_list = store_details.categories.join(',');
            }
            if(val.promo_image_url_abs.indexOf('missing.png') > 0){ 
                val.promo_image_url_abs = store_details.store_front_url_abs;
            }
        } else {
            val.store_name = site_json.mall_name;
            val.image_url = site_json.default_image;
            if(val.promo_image_url_abs.indexOf('missing.png') > 0){ 
                val.promo_image_url_abs = site_json.default_image;
            }
        }
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = site_json.default_image;
        }
        
        if(val.description.length > 200){
            val.description_short = val.description.substring(0,200) + "...";
        } else {
            val.description_short = val.description
        }
        
        var show_date = moment(val.show_on_web_date).tz(getPropertyTimeZone());
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        } else {
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderEvents(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.image_url = store_details.store_front_url_abs;
            val.cat_list = store_details.categories.join(',')
        } else {
            val.store_name = site_json.mall_name;
            val.image_url = site_json.default_image;
            if (val.event_image_url_abs.indexOf('missing.png') > 0) {
                val.logo_url = site_json.default_image;
            } else {
                val.logo_url = val.event_image_url_abs
            }
        }

        if (val.description.length > 200){
            val.description_short = val.description.substring(0,200) + "...";
        } else {
            val.description_short = val.description
        }
        
        // if (val.event_image_url_abs.indexOf('missing.png') > -1){
        //     val.event_image_url_abs = site_json.default_image;
        // }
        
        var show_date = moment(val.show_on_web_date).tz(getPropertyTimeZone());
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        } else {
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}


function renderGeneral(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderStoreList(container, template, collection, starter, breaker){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var store_initial="";
    $.each( collection , function( key, val ) {
        if(!val.store_front_url ||  val.store_front_url.indexOf('missing.png') > -1 || val.store_front_url.length === 0){
            val.alt_store_front_url = site_json.default_image;
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url);    
        }
        
        if(val.categories != null){
            try {
                val.cat_list = val.categories.join(',');
            } catch(err) {
                console.log(err);
            }
        }
        
        var current_initial = val.name[0];
        if(store_initial.toLowerCase() == current_initial.toLowerCase()){
            val.initial = "";
            val.show = "display:none;";
        } else {
            val.initial = current_initial;
            store_initial = current_initial;
            val.show = "display:block;";
        }
        
        if (val.promotions != null){
            val.promotion_exist = "display:inline-block";
        } else {
            val.promotion_exist = "display:none";
        }
        
        if (val.jobs !=null){
            val.job_exist = "display:inline-block";
        } else {
            val.job_exist = "display:none";
        }
        
        val.block = current_initial + '-block';
        var rendered = Mustache.render(template_html,val);
        var upper_current_initial = current_initial.toUpperCase();
        if(starter == '#' && breaker == '#' && isInt(upper_current_initial)){
            item_rendered.push(rendered);
            $('.numbers_exist').css('display', 'block');
        }
        if (upper_current_initial.charCodeAt(0) <= breaker.charCodeAt(0) && upper_current_initial.charCodeAt(0) >= starter.charCodeAt(0)){
            item_rendered.push(rendered);
        }
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderPromoDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.store_image = store_details.store_front_url_abs;
            val.store_slug = store_details.slug
            if (store_details.website != null && store_details.website.length > 0){
                val.show = "display:inline-block";
                val.website = store_details.website
            } else {
                val.show = "display:none";
            }
            
            if (store_details.phone != null && store_details.phone.length > 0){
                val.phone_show = "display:inline-block";
                val.phone = store_details.phone
            } else {
                val.phone_show = "display:none";
                val.show = "display:none";
            }
            if(val.store_image.indexOf('missing.png') > 0){
                val.store_image = site_json.default_image;
            }
        } else {
            val.store_name = site_json.mall_name;
            val.store_image = site_json.default_image;
            val.image_show = "display:none";
            val.store_show = "display:none";
            val.phone_show = "display:none";
            val.show = "display:none";
            val.show_box = "display:none";
        }
        val.image_url = val.promo_image_url_abs
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = site_json.default_image;
            val.promo_image_show = "display:none";
        }
        
        if(val.promo_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = moment(val.show_on_web_date).tz(getPropertyTimeZone());
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        } else {
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderEventDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.store_image = store_details.store_front_url_abs;
            val.store_slug = store_details.slug
            if (store_details.website != null && store_details.website.length > 0){
                val.show = "display:inline-block";
                val.website = store_details.website
            } else {
                val.show = "display:none";
            }
            
            if (store_details.phone != null && store_details.phone.length > 0){
                val.phone_show = "display:inline-block";
                val.phone = store_details.phone
            } else {
                val.phone_show = "display:none";
                val.show = "display:none";
            }
        } else {
            val.store_name = site_json.mall_name;
            val.store_image = site_json.default_image;
            val.store_show = "display:none";
            val.phone_show = "display:none";
            val.show = "display:none";
            val.show_box= "display:none"
            val.image_show = "display:none";
        }
        val.image_url = val.event_image_url_abs
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = site_json.default_image;
            val.event_image_show = "display:none";
        }
        
        if(val.event_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = moment(val.show_on_web_date).tz(getPropertyTimeZone());
        start = moment(val.start_date).tz(getPropertyTimeZone());
        end = moment(val.end_date).tz(getPropertyTimeZone());
    
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        } else {
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderJobs(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.jobable_type == "Store"){
            val.store_name = getStoreDetailsByID(val.jobable_id).name;
            val.store_slug = getStoreDetailsByID(val.jobable_id).slug;
        } else {
            val.store_name = site_json.mall_name;
        }
        
        if(val.description.length > 200){
            val.description_short = val.description.substring(0,200) + "...";
        } else {
            val.description_short = val.description;
        }
        
        var show_date = moment(val.show_on_web_date).tz(getPropertyTimeZone());
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
    
        val.published_on = end.format("MMM")+ " " + end.format("DD");
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderStoreDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if ((val.store_front_url).indexOf('missing.png') > -1){
            val.alt_store_front_url = site_json.default_image;
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url); 
        }
        
        if (val.website != null && val.website.length > 0){
            val.show = "display:inline-block";
        } else {
            val.show = "display:none";
        }
        if (val.phone != null && val.phone.length > 0){
            val.phone_show = "display:inline-block";
        } else {
            val.phone_show = "display:none";
        }
        if (val.total_published_promos == null || val.total_published_promos == undefined){
            val.total_published_promos = 0;
        }
        if (val.total_published_jobs == null || val.total_published_jobs == undefined){
            val.total_published_jobs = 0;
        }
        if (val.twitter != null && val.twitter.length > 0){
            val.twitter_show = "display:inline-block";
        } else {
            val.twitter_show = "display:none";
        }
        
        if((val.twitter == null || val.twitter == "") && (val.facebook == "" || val.facebook == null)){
            val.hide_social = "display:none;";
        }
        if (val.facebook != null && val.facebook.length > 0){
            val.facebook_show = "display:inline-block";
        }
        else{
            val.facebook_show = "display:none";
        }
        val.map_x_coordinate = val.x_coordinate - 19;
        val.map_y_coordinate = val.y_coordinate - 58;
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderJobDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.jobable_type == "Store") {
            var store_details = getStoreDetailsByID(val.jobable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.store_image = store_details.store_front_url_abs;
            val.store_slug = store_details.slug
            if (store_details.website != null && store_details.website.length > 0){
                val.show = "display:inline-block";
                val.website = store_details.website
            } else {
                val.show = "display:none";
            }
            if (store_details.phone != null && store_details.phone.length > 0){
                val.phone_show = "display:inline-block";
                val.phone = store_details.phone
            } else {
                val.phone_show = "display:none";
                val.show = "display:none";
            }
        } else {
            val.store_name = site_json.mall_name;
            val.store_image = site_json.default_image;
            val.store_show = "display:none";
            val.phone_show = "display:none";
            val.show = "display:none";
            val.show_box= "display:none"
            val.image_show = "display:none";
        }
        
        if(val.description.length > 200){
            val.description_short = val.description.substring(0, 200) + "..."
        } else {
            val.description_short = val.description
        }
        
        var show_date = moment(val.show_on_web_date).tz(getPropertyTimeZone());
        val.published_on = show_date.format("MMM")+ " " + show_date.format("DD")
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderContest(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    collection.alt_photo_url = getImageURL(collection.photo_url);
    collection.property_id = getPropertyID();
    var rendered = Mustache.render(template_html,collection);
    item_rendered.push(rendered);
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderHomeHours(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);    
    $.each( item_list , function( key, val ) {
        // val.day = get_day(val.day_of_week);
        // var d = new Date();
        // val.month = get_month(d.getMonth());
        // val.weekday = addZero(d.getDate());
        // if (val.open_time && val.close_time && (val.is_closed == false || val.is_closed == null)){
        //     var open_time = new Date (val.open_time);
        //     var close_time = new Date (val.close_time);
        //     val.open_time = convert_hour(open_time);
        //     val.close_time = convert_hour(close_time);    
        //     val.h = get_day(d.getDay()) + " " + val.open_time+ " - " + val.close_time;
        // } else {
        //     val.h = "Closed";
        // }
        
        val.day = moment().format("ddd");
        var d = moment();
        val.month = moment().month();
        val.weekday = moment().date();
        
        if (val.open_time && val.close_time && (val.is_closed == false || val.is_closed == null)){
            var open_time = moment(val.open_time).tz(getPropertyTimeZone());
            var close_time = moment(val.close_time).tz(getPropertyTimeZone());
            val.h = open_time.format("h:mmA") + " - " + close_time.format("h:mmA");
        } else {
            val.h = "";
            $("#open_today").text("Closed Today");
            $('.hours').css("background", "#FF001A");
            $(".todays_hours").text("Closed Today");
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderHours(container, template, collection, type){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    if (type == "property_details"){
        item_list.push(collection);
        collection = []
        collection = item_list;
    }
    if (type == "reg_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == false) {
                switch(val.day_of_week) {
                case 0:
                    val.day = "Sunday"
                    break;
                case 1:
                    val.day = "Monday"
                    break;
                case 2:
                    val.day = "Tuesday"
                    break;
                case 3:
                    val.day = "Wednesday"
                    break;
                case 4:
                    val.day = "Thursday"
                    break;
                case 5:
                    val.day = "Friday"
                    break;
                case 6:
                    val.day = "Saturday"
                    break;
            }
            if (val.open_time && val.close_time && val.is_closed == false){
                // var open_time = new Date (val.open_time)
                // var close_time = new Date (val.close_time)
                // val.open_time = convert_hour(open_time);
                // val.close_time = convert_hour(close_time);    
                // val.h = val.open_time+ " - " + val.close_time;
                
                var open_time = moment(val.open_time).tz(getPropertyTimeZone());
                
                var close_time = moment(val.close_time).tz(getPropertyTimeZone());
                
                val.h = open_time.format("h:mm A") + " - " + close_time.format("h:mm A");
            } else {
                "Closed"
            }
                item_list.push(val)
            }
        });
        collection = []
        collection = item_list;
    }
    // if (type == "holiday_hours") {
    //     $.each( collection , function( key, val ) {
    //         if (!val.store_id && val.is_holiday == true) {
    //             holiday = new Date (val.holiday_date)
    //             holiday.setDate(holiday.getDate()+1);
    //             var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //             val.formatted_date = weekdays[holiday.getDay()]+ " " + get_month(holiday.getMonth()) + " " +holiday.getDate()+ " " + holiday.getFullYear()
    //             if (val.open_time && val.close_time && val.is_closed == false){
    //                 var open_time = new Date (val.open_time)
    //                 var close_time = new Date (val.close_time)
    //                 val.open_time = convert_hour(open_time);
    //                 val.close_time = convert_hour(close_time);    
    //                 if (val.open_time == "0:00 AM"){
    //                     val.open_time = "12:00 AM"
    //                 }
    //                  if (val.close_time == "0:00 AM"){
    //                     val.close_time = "12:00 AM"
    //                 }
    //                 val.h = val.open_time+ " - " + val.close_time;
    //             } else {
    //                 val.h = "Closed"
    //             }
    //             if (val.h != "Closed"){
    //                 item_list.push(val)
    //             }
    //         }
    //     });
    //     collection = []
    //     collection = item_list;
    // }
    
    if (type == "holiday_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == true) {
                holiday = moment(val.holiday_date).tz(getPropertyTimeZone());
                var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                val.formatted_date = holiday.format("dddd MMM D YYYY");
                
                if (val.open_time && val.close_time && val.is_closed == false){
                    var open_time = moment(val.open_time).tz(getPropertyTimeZone());
                    var close_time = moment(val.close_time).tz(getPropertyTimeZone());
                    if (val.open_time == "0:00 AM"){
                        val.open_time = "12:00 AM"
                    }
                     if (val.close_time == "0:00 AM"){
                        val.close_time = "12:00 AM"
                    }
                    val.h = open_time.format("h:mmA") + " - " + close_time.format("h:mmA");
                } else {
                    val.h = "Closed"
                }
                if (val.h != "Closed"){
                    item_list.push(val)
                }
            }
        });
        collection = []
        collection = item_list;
    }
    // if (type == "closed_hours") {
    //     $.each( collection , function( key, val ) {
    //         if (!val.store_id && val.is_holiday == true) {
    //             holiday = new Date (val.holiday_date + "T05:00:00Z")
    //             var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //             val.formatted_date = weekdays[holiday.getDay()]+ " " + get_month(holiday.getMonth()) + " " +holiday.getDate()+ " " + holiday.getFullYear()
    //             if (val.open_time && val.close_time && val.is_closed == false){
    //                 var open_time = new Date (val.open_time)
    //                 var close_time = new Date (val.close_time)
    //                 val.open_time = convert_hour(open_time);
    //                 val.close_time = convert_hour(close_time);    
    //                 if (val.open_time == "0:00 AM"){
    //                     val.open_time = "12:00 AM"
    //                 }
    //                  if (val.close_time == "0:00 AM"){
    //                     val.close_time = "12:00 AM"
    //                 }
    //                 val.h = val.open_time+ " to " + val.close_time;
    //             } else {
    //                 val.h = "Closed"
    //             }
    //             if (val.h == "Closed"){
    //                 item_list.push(val)
    //             }
    //         }
    //     });
    //     collection = []
    //     collection = item_list;
    // }
    
    if (type == "closed_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == true) {
                holiday = moment(val.holiday_date).tz(getPropertyTimeZone());
                var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                val.formatted_date = holiday.format("dddd MMM D YYYY");
                
                if (val.open_time && val.close_time && val.is_closed == false){
                    var open_time = moment(val.open_time).tz(getPropertyTimeZone());
                    var close_time = moment(val.close_time).tz(getPropertyTimeZone());
                    if (val.open_time == "0:00 AM"){
                        val.open_time = "12:00 AM"
                    }
                     if (val.close_time == "0:00 AM"){
                        val.close_time = "12:00 AM"
                    }
                    val.h = open_time.format("h:mm A") + " to " + close_time.format("h:mm A");
                } else {
                    val.h = "Closed"
                }
                if (val.h == "Closed") {
                    item_list.push(val)
                }
            }
        });
        collection = []
        collection = item_list;
    }
    $.each( collection , function( key, val ) {
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderPosts(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    var counter = 1;
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "//codecloud.cdn.speedyrails.net/sites/586e72336e6f6456f1180000/image/png/1483644872000/Londonderry_Final Logo.png";
        } else {
            val.post_image = val.image_url;
        }
        if(val.body.length > 100){
            val.description_short = val.body.substring(0,100) + "...";
        }
        else{
            val.description_short = val.body;
        }
        val.description_short = val.description_short.replace("&amp;", "&");
        var date_blog = new Date(val.publish_date);
        val.published_on = get_month(date_blog.getMonth()) + " " + date_blog.getDate() + ", " + date_blog.getFullYear();
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
        counter = counter+1;
    });
    $(container).show();
    $(container).html(item_rendered.join(''));
}