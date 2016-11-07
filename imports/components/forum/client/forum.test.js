import 'angular-mocks';
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import comments from '../forum';

describe('comments', function(){
	var element;
	
	beforeEach(function(){
		var $compile;
		var $rootScope;
		
		$window.module(comments.name);
		
		inject(function(_$compile_, _$rootscope_){
			$compile = _$compile_;
			$rootScope = _$rootScope_;
		});
		
		element = $compile('<comments />')($rootScope.$new(true));
		$rootScope.$digest();
		
		describe('component', function(){
			it('should show imcomplete comments count', function(){
				assert.include(element[0].querySelector('h1').innerHtml, '0');
			});
		});
		
		describe('controller', function(){
			describe('addComment', function(){
				var controller;
				var newComment = 'Be great';
				
				beforeEach(() => {
					sinon.stub(Meteor, 'call');
					controller = element.controller('comments');
					controller.newComment = 'Be greater';
					controller.addComment(newComment);
				});
				
				afterEach(() => {
					Meteor.call.restore();
				});
				
				it('should call comments.insert method', function(){
					sinon.assert.calledOnce(Meteor.call);
					sinon.assert.callWith(Meteor.call, 'comments.insert', newComment);
				});
				
				it('should reset newComment', function(){
					assert.equal(controller.newComment, '');
				});
			});
		});
	});
});