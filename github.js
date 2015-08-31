$(function() {
// TODO: You code goes here.
	var avatar;
	var repoList = [];
	// get user name
	function findUser() {
		username = $('input').val();
		$('#username').text(username);
		$.ajax({
			url: 'https://api.github.com/users/' + username,
			method: 'GET',
			success: function(data) {
				avatar = data.avatar_url;
				$('#profilePhoto').attr('src', avatar);
			},
			contentType: 'application/json'
		})
	}

	function getUserRepos() {
		//if there are previous github repos, fade out the bullet points
		$('li').fadeOut();
		$('#list').show();
		$.ajax({
			url: 'https://api.github.com/users/' + username + '/repos',
			method: 'GET',
			success: function(data){
				repoList = [];
				for (var i = 0; i < data.length; i++) {
					repoList.push(data[i].name);
				}
				console.log(repoList);
				for( var i = 0; i < repoList.length; i++) {
					$('#list').append('<li>' + repoList[i] + '</li>');
				}
			}
		})
	}

	$('#searchform').on('submit', function(e) {
		e.preventDefault();
		findUser();
		getUserRepos();
	})

	$('#repositories').append('<ul id="list"> Github repos: </ul>');
	$('#list').hide();
	$('#container').append(
		'<img id="backgroundImg" src="http://trickvilla.com/wp-content/uploads/Wood-Background-Image.png" />');
});
