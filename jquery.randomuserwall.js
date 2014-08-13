/*
**********************************************************
* RandomUserWall | A random wall of faces
* 
* Version:		1.0.0
* Author:		Mike Zarandona
* Release:		August 13 2014
* 				Initial commit.
* 
* Reqs:			jQuery
* 
* Usage:		$('.target').randomUserWall({ numFaces: 24 });
**********************************************************
*/

(function ($, undefined) {
	$.fn.randomUserWall = function (options) {

		// Override defaults with specified options
		options = $.extend({}, $.fn.randomUserWall.options, options);

		// Main Loop
		return this.each(function () {

			var mFaceIDs = [],
				fFaceIDs = [],
				thisFace,
				thisGender,
				uniqueFlag,
				size = '';

			// build face id arrays
			for ( var i = 0; i < options.numFaces; i++ ) {

				do {
					// decide gender
					if ( options.gender == 'female' ) { thisGender = true; }
					else if ( options.gender == 'male' ) { thisGender = false; }
					else {
						// or get a random gender
						thisGender = Math.random() < 0.5 ? false : true;
					}

					// get a random face
					thisFace = getMeAFace( thisGender );

					// check and push into arrays if this gender/face combo is unique
					uniqueFlag = isThisUnique( thisGender, thisFace, mFaceIDs, fFaceIDs, uniqueFlag );

				} while ( uniqueFlag === false );
			}


			// determine the image sizes
			if ( options.imgSize == 'thumb' ) { size = 'thumb/'; }
			else if ( options.imgSize == 'med' ) { size = 'med/'; }


			// write the faces to the target
			if ( options.gender == 'female' ) {
				for ( i = 0; i < options.numFaces; i++ ) {
					$(this).append('<img src="http://api.randomuser.me/portraits/' + size + 'women/' + fFaceIDs[i] + '.jpg" />');
				}
			}
			else if ( options.gender == 'male' ) {
				for ( i = 0; i < options.numFaces; i++ ) {
					$(this).append('<img src="http://api.randomuser.me/portraits/' + size + 'men/' + mFaceIDs[i] + '.jpg" />');
				}
			}
			else {
				var completeFlag = false;

				do {
					thisGender = Math.random() < 0.5 ? false : true;

					if ( (thisGender === false) && (fFaceIDs.length > 0) ) {
						$(this).append('<img src="http://api.randomuser.me/portraits/' + size + 'women/' + fFaceIDs[0] + '.jpg" />');
						fFaceIDs.splice(0, 1);
					}
					else if ( (thisGender === true) && (mFaceIDs.length > 0) ) {
						$(this).append('<img src="http://api.randomuser.me/portraits/' + size + 'men/' + mFaceIDs[0] + '.jpg" />');
						mFaceIDs.splice(0, 1);
					}

					if ( (mFaceIDs.length === 0) && (fFaceIDs.length === 0) ) { completeFlag = true; }
				} while ( completeFlag === false );
			}
		});
	};



	/**
	 * Helper Function to go get a face.  duh.
	 * 	gender:			false=male | true=female
	 */
	function getMeAFace( gender ) {
		var randomNumber,
			totalNumberOfMaleFaces = 100;		// max 100 slots (0 - 99)
			totalNumberOfFemaleFaces = 96;		// max 96 slots (0 - 95)

		// male
		if ( gender === false ) {
			randomNumber = Math.floor( Math.random() * totalNumberOfMaleFaces );
		}
		else if ( gender === true ) {
			randomNumber = Math.floor( Math.random() * totalNumberOfFemaleFaces );
		}
		else { console.error('RandomUserWall ERROR:  Thunk.'); }

		return randomNumber;
	}



	/**
	 * Helper Function to determine if this face is unique based on the gender
	 * 	gender:			false=male | true=female
	 *	id:				this users' id
	 *	mFaceIDs:		array holding the male faces
	 *	fFaceIDs:		array holding the female faces
	 *	uniqueFag:		marker flag return variable
	 */
	function isThisUnique(gender, id, mFaceIDs, fFaceIDs, uniqueFlag) {

		// female
		if ( gender === true ) {
			if ( $.inArray(id, fFaceIDs) >= 0 ) {
				// not unique
				uniqueFlag = false;
			}
			else {
				// is unique - push into the 
				uniqueFlag = true;
				fFaceIDs.push( id );
			}
			return uniqueFlag;
		}

		// male
		else if ( gender === false ) {
			if ( $.inArray(id, mFaceIDs) >= 0 ) {
				// not unique
				uniqueFlag = false;
			}
			else {
				// is unique - push into the 
				uniqueFlag = true;
				mFaceIDs.push( id );
			}
			return uniqueFlag;
		}

		// error checking
		else { console.error('RandomUserWall Error:  Clunk.'); }
	}



	// Default the defaults
	$.fn.randomUserWall.options = {
		numFaces: 0,
		gender: '',
		imgSize: ''
	};
})(jQuery);
