$(function() {
    function buildHTML(message) {
        var html = `<div class="chat-main__messages__content">
                        <div class="chat-main__messages__content__user">
                            <div class="chat-main__messages__content__user--name">
                                ${message.user.name}
                            </div>
                            <div class="chat-main__messages__content__user--date">
                                ${message.created_at}
                            </div>
                        </div>
                        <div class="chat-main__messages__content__text">
                            ${message.body}
                        </div>
                    </div>`
        return html;
    }

    $('#new_message').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action');
        $(".chat-main__form__btn--style").removeAttr('data-disable-with');
        // var href = window.location.href + './messages'
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(data) {
            var html = buildHTML(data);
            $('.chat-main__messages').append(html)
            $('#message_body').val('')
            // $().animate({scrollTop: $('.chat-main__messages').height()},500);
            // $('')
            
         })
         .fail(function() {
            alert('error');
         })
    })

});