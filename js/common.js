(function($){
    // 페이지 로드 시키기
    $('body').on('click','#header h1 a, #footer .footerMenu a, #content .contTit a, #content .mainList a, #navWrap a',function(e){
        e.preventDefault()
        var url = $(this).attr('href')
        $('#container > #content').remove()
        $('#container').load(url+' #content')
    })

  
    // ajax
    var usedata;
    $.ajax({
        type:'GET',
        url:'data/dinotaeng.json',
        beforeSend: function(xhr){
            if(xhr.overrideMimeType){
                xhr.overrideMimeType('application/json')
            }
        },
        success:function(data){
            usedata = data
        },
        error:function(){
            alert(abc.status+'오류발생')
        }
    })

    $('#container').on('click','.shopListContent .shopList a, .depth1 > li > a, .depth2 > li > a',function(e){
        e.preventDefault()
        var url = this.href;
        var part = $(this).attr('class');
        $('#container > #content').remove()
        $('#container').load(url+' #content', function(){
            var newContent = '';
            for ( var i in usedata[part]){
                newContent += `<li><a href="#"><div class="case-overlay"><img src="${usedata[part][i].photo}" alt=""></div>`
                newContent += `<h2>${usedata[part][i].name}</h2>`
                newContent += `<p>${usedata[part][i].price}</p>`
                newContent += `<p>${usedata[part][i].about}</p></a></li>`
                $('#content .part1Wrap').html(`<ul>${newContent}</ul>`)
            }
        })
    })

    // 햄버거 버튼 클릭하면 네비박스 열고 X 버튼 클릭하면 닫기
    $('.topmenu .menu').on('click',function(e){
        e.preventDefault()
        $('#navWrap').css({
            display:'block'
        }),
        $('#lnb').stop().animate({
            right:'0%'
        },300)
    })
    $('#lnb .lnbClose').on('click',function(){
        $('#lnb').stop().animate({
            right:'-90%'
        },300,function(){
            $('#navWrap').css({
                display:'none'
            })
        })
    })

    // 돋보기 버튼 클릭하면 검색창 열리기
    $('.topmenu .search').on('click',function(){
        $('.searchWrap').toggleClass('on')

    })

    // depth1 클릭하면 depth2 열리기
    $('.depth1 > li > a').on('click',function(e){
        e.preventDefault()
            if($(this).next().is('.depth2')){
                $(this).parent().toggleClass('on')
                $(this).parent().find('.depth2').stop().slideToggle(300)
            } else if ( !$(this).next().next().is('.depth2')){
                var url = $(this).attr('href')
                $('#container > #content').remove()
                $('#container').load(url+' #content')
                $('#navWrap').hide()
            }
    })
    $('.depth2 > li > a').on('click',function(e){
        e.preventDefault()
        var url = $(this).attr('href')
                $('#container > #content').remove()
                $('#container').load(url+' #content')
                $('#navWrap').hide()
    })

   


    // depth2 클릭하면 페이지 로드 시키기
    

    
        
        
        
    
  





})(jQuery)