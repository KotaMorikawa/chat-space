$(function() {
    $(document).on('turbolinks:load', function() { 
        var search_list = $('#user-search-result');
        var selected_list = $('#chat-group-users');
        var user_name = $('.current_user_name').val();
        var user_id = $('.current_user_id').val();
        var group_users = $('.group_users').val();
        $(function() {
            var html = ` <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                            <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                            <p class='chat-group-user__name'>${user_name}</p>
                        </div>`
            selected_list.append(html)
        });

        $(function() {
            group_users.forEach(function(group_user) {
                appendfirst(group_user);
            })

            function appendfirst(group_user) {
            var html =` <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                            <input name='group[user_ids][]' type='hidden' value='${group_user.id}'>
                            <p class='chat-group-user__name'>${group_user.name}</p>
                            <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                        </div>`
            selected_list.append(html)
            }
        });

        function appendList(user) {
            var html = `<div class="chat-group-user clearfix">
                            <p class="chat-group-user__name">${user.name}</p>
                            <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                        </div>`
            search_list.append(html);
        }

        function appendUser(user_id, user_name) {
            var html =` <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                            <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                            <p class='chat-group-user__name'>${user_name}</p>
                            <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                        </div>`
            selected_list.append(html)

        }

        function appendErrMsgToHTML(msg) {
            var html =` <div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${msg}</p>
                        </div>`
            search_list.append(html);
        }
        $("#user-search-field").on("keyup", function() {
            var input = $('#user-search-field').val();
            
            if (input.length === 0){
                
            }
            else {
            $.ajax({
                type: 'GET',
                url: '/users',
                data: { keyword: input },
                dataType: 'json',
            })
            .done(function(users) {
                search_list.empty();
                if (users.length !== 0) {
                    users.forEach(function(user){
                    appendList(user);
                    });
                }
                else {
                    appendErrMsgToHTML("一致するユーザーはいません");
                }
            })
            .fail(function(){
                alert("ユーザー検索に失敗しました");
            })
            }
        });
        $(document).on("click", ".user-search-add", function() {
            var user_id = $(this).data("user-id");
            var user_name = $(this).data("user-name");
            appendUser(user_id, user_name)
            var user = $(this).parent();
            $(user).remove();
        });
        $(document).on("click", ".user-search-remove", function() {
            var vanish_user = $(this).parent();
            $(vanish_user).remove();
        })
    });

});