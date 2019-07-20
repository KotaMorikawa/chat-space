$(function() {
    $(document).on('turbolinks:load', function() { 
        function buildHTML(message) {
            var body = message.body ? `${ message.body }` : "";
            var image = message.image ? `<img src= ${ message.image }>` : "";
            var html = `<div class="chat-main__messages__content" data-message-id="${message.id}">
                            <div class="chat-main__messages__content__user">
                                <div class="chat-main__messages__content__user--name">
                                    ${message.user_name}
                                </div>
                                <div class="chat-main__messages__content__user--date">
                                    ${message.time}
                                </div>
                            </div>
                            <div class="chat-main__messages__content__text">
                                ${body}
                                ${image}
                            </div>
                        </div>`
            return html;
        }
        $('#new_message').on('submit', function(e) {
            e.preventDefault();
            var formData = new FormData(this);
            var url = $(this).attr('action');
            $(".chat-main__form__btn--style").removeAttr('data-disable-with');
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
                $(".chat-main__messages").animate({scrollTop: $(".chat-main__messages")[0].scrollHeight}, 'fast');
                $('#new_message')[0].reset();
            })
            .fail(function() {
                alert('メッセージを入力してください！');
            })
            .always(function(data){
                $('.chat-main__form__btn--style').prop('disabled', false);
            })
        })

        var reloadMessages = function() {
            if (window.location.href.match(/\/groups\/\d+\/messages/)) {
                var last_message_id = $('.chat-main__messages__content:last').data('message-id');
                $.ajax({
                url: 'api/messages',
                type: 'get',
                dataType: 'json',
                data: {id: last_message_id}
                })
                .done(function(messages) {
                    var insertHTML = '';
                    messages.forEach(function(message) {
                        insertHTML = buildHTML(message);
                        $('.chat-main__messages').append(insertHTML);
                        $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
                    })
                })
                .fail(function() {
                    alert('自動更新に失敗しました');
                });
            }
        };
        setInterval(reloadMessages, 1000);
    });
});