import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Forum } from '../../api/comments.js';
import template from './forum.html';
import utilsPagination from 'angular-utils-pagination';

class CommentsController {
	constructor($scope) {
		$scope.viewModel(this);
		
		this.perPage = 10;
		this.page = 1;
		this.sort = { text: -1 };
		this.searchText = '';
		this.category = 'Topics';
		
		this.subscribe('comments', () => [{
			limit: parseInt(this.perPage),
			skip: parseInt((this.getReactively('page') - 1) * this.perPage),
			sort: this.getReactively('sort'),
			}, this.getReactively('searchText')
		]);

		this.hideCompleted = false;
		this.faq = false;
		
		this.openReplies = false;
		this.error = false;

		this.helpers({
			comments(){
				const selector = {};
				
				if(this.getReactively('hideCompleted')){
					selector.checked = { $ne: true };
				}
				
				if(this.getReactively('openReplies'), true){
					selector.openReplies = { $ne: true };
				}
				
				if(this.getReactively('error')){
					selector.error = { $ne: true };
				}

				return Forum.find(selector, {
					sort: this.getReactively('sort')
				});
			},
			countTopics(){
				return Counts.get('numberOfTopics');
			},
			currentUser() {
				return Meteor.user();
			}
		});
	}
	
	addComment(newComment) {
		Meteor.call('comments.insert', newComment); // Use API Method
		this.newComment = ''; // clear form
	}
	
	setReplyToComment(comments){ console.log(this.error);
		Meteor.call('comments.setReplyToComment', comments._id, !comments.reply);
		
		// If not logged in throw error
		if( !Meteor.userId() ){ this.error = true; }
		else { this.error = false; }
	}
	
	replyToComment(comments){ console.log(this.error);
		Meteor.call('comments.replyToComment', comments._id, comments.newReply);
		Meteor.call('comments.setReplyToComment', comments._id, !comments.reply);
	}
	
	openReplyBox(comments){
//		Forum.update (comments._id, {
//			this.getReactively('openReplies')
//		});
		return this.openReplies = !this.openReplies;
	}
	
	setReplyToReply(comments, replyTime){
		Meteor.call('comments.setReplyToReply', comments._id, replyTime, !comments.replyReply); 
	}
	
	replyToReply(comments){
		Meteor.call('comments.setReplyToReply', comments._id, !comments.reply);
	}
	
	setChecked(comments){
		Meteor.call('comments.setChecked', comments._id, !comments.checked); // Use API Method
	}
	
	removeComment(comments){
		Meteor.call('comments.remove', comments._id); // Use API Method
	}
	
	setPrivate(comments) {
		Meteor.call('comments.setPrivate', comments._id, !comments.private); // Use API Method
	}
	
	pageChanged(newPage){
		this.page = newPage;
	}
	
	faqView(comments){
		this.faq = true;
		this.searchText = "faq";
		this.category = 'Frequently Asked Questions';
	}
	
	topicsView(comments){
		this.searchText = '';
		this.category = 'Topics';
		this.faq = false;
	}
}

export default angular.module('comments', [ angularMeteor, utilsPagination ])
	.component('comments', {
		templateUrl: 'imports/components/forum/forum.html',
		controller: [ '$scope', CommentsController ]
	});