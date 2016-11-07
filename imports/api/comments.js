import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';

export const Forum = new Mongo.Collection('forum');

if (Meteor.isServer) {
	// Only publish comments that are public or belong to current user
	Meteor.publish('comments', function commentsPublication(options, searchString){
		
		const selector = {
				$or: [
				      { private: { $ne:true } }, 
				      { owner: this.userId }
				     ]	
		};
		
		// Search Box
		if (typeof searchString === 'string' && searchString.length) {
			selector.text = {
					$regex: `.*${searchString}.*`,
			        $options : 'i'
			}
		}
		
		// Counts topics
		Counts.publish(this, 'numberOfTopics', Forum.find(selector), {
			noReady:true
		});
		
		return Forum.find(selector, options);
	});
}

Meteor.methods({
	'authorize' (commentId){
		check(commentId, String);
		const comment = Forum.findOne(commentId);
		
		if (comment.private && comment.owner !== Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
	},
	'comments.insert' (text) {
		check(text, String);
	
		if (!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}
		
		Forum.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	'comments.setReplyToComment' (commentId, setReplyToComment){
		check(setReplyToComment, Boolean);
		const comment = Forum.findOne(commentId);
		
		Meteor.call('authorize', comment._id, !comment.checked);
		
		Forum.update(commentId, {
			$set: { reply: setReplyToComment }
		});
	},
	'comments.replyToComment' (commentId, text){
		check(text, String);
		const comment = Forum.findOne(commentId);
		
		Meteor.call('authorize', comment._id, !comment.checked);

		Forum.update(
				{ _id: comment._id }, 
				{ $addToSet: 
					{ replys: { 
						newReply:text, 
						repliedAt:new Date(), 
						replyOwnerName:Meteor.user().username,
						replyToReply: {}
					} 
				}
		});
	},
	'comments.setReplyToReply' (commentId, replyTime, setReplyToReply){
		check(setReplyToReply, Boolean);
		const comment = Forum.findOne(commentId);
		
		Meteor.call('authorize', commentId, !comment.checked);

  		Forum.update(
				{ _id: commentId }, 
				{ $addToSet: { replys: { replyToReply: { setReplyToReply: setReplyToReply } } }
		});
	},
	'comments.remove' (commentId) {
		const comment = Forum.findOne(commentId);
		Meteor.call('authorize', comment._id, !comment.checked);
		
		Forum.remove(commentId);
	},
	'comments.setChecked' (commentId, setChecked){
		check(setChecked, Boolean);
		const comment = Forum.findOne(commentId);
		
		Meteor.call('authorize', comment._id, !comment.checked);
		
		Forum.update (commentId, {
			$set: { checked: setChecked }
		});
	},
	'comments.setPrivate' (commentId, setToPrivate) {
		check(setToPrivate, Boolean);		
		const comment = Forum.findOne(commentId);
		
		Meteor.call('authorize', comment._id, !comment.checked);
		
		Forum.update(commentId, {
			$set: { private: setToPrivate }
		});
	}
});