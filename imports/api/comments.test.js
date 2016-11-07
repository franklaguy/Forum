import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Forum } from './comments.js';

if (Meteor.isServer){
	describe('Forum', () => {
		describe('methods', () => {
			const userId = Random.id();
			let commentId;
			
			beforeEach(() => {
				Forum.remove({});
				commentId = Forum.insert({
					text: 'test text',
					createdAt: new Date(),
					owner: userId,
					username: 'whateve'
				});
			});
			
			it('can delete ownded task', () => {
				const deleteComment = Meteor.server.method_handlers['comments.remove'];
				const invocation = { userId };
				
				deleteComment.apply(invocation, [commentId]);
				assert.equal(Forum.find().count(), 0);
			});
		});
	});
}