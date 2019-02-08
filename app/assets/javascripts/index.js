class Index {
	constructor(options){
		this.options = _.extend({}, options);

		// Set up the vue objects for this page
		Vue.component('timer-button', {
			props: [
				'id'
			],
			template: ch('div', {
				'class': 'timer'
			}, [
				ch('div', {}, [
					ch('button', {
						'v-on:click': 'toggleTimer',
						type: 'button',
						'class': 'btn',
						'v-bind:class': 'computedClasses'
					}, [
						'{{ id }}'
					]),
					ch('button', {
						'v-on:click': 'cancelTimer',
						type: 'button',
						'class': 'btn btn-danger',
						'v-bind:class': 'hiddenButtonClasses'
					}, ['X'])
				]),
				ch('div', {
					'class': 'time-display'
				}, [
					'{{ totalTime > 0 ? "T: " + totalTimeDisplayable : "" }}<br />'
				]),
				ch('div', {
					'class': 'time-display'
				}, [
					'{{ totalTime > 0 ? "A: " + averageTime : "" }}<br />'
				])
			]),
			data: function(){
				return {
					totalTime: 0,
					intervals: 0,
					startTime: undefined,
					endTime: undefined
				};
			},
			computed: {
				computedClasses: function(){
					var classes = {
						'btn-success': false,
						'btn-primary': false
					};

					if (this.startTime){
						classes['btn-success'] = true;
					} else {
						classes['btn-primary'] = true;
					}
					return classes;
				},

				hiddenButtonClasses: function(){
					var classes = {
						'hidden': false
					};

					if (!this.startTime){
						classes['hidden'] = true;
					}
					return classes;
				},

				totalTimeDisplayable: function(){
					return this.timeFromSeconds(this.totalTime);
				},

				averageTime: function(){
					if (this.intervals > 0){
						return this.timeFromSeconds(Math.floor(this.totalTime / this.intervals));
					}
					return this.timefromSeconds(0);
				}
			},
			methods: {
				toggleTimer: function(){
					var thisIntervalTime = 0;
					if (_.isUndefined(this.startTime)){
						this.startTime = Math.floor(Date.now() / 1000);
					} else {
						this.endTime = Math.floor(Date.now() / 1000);
						thisIntervalTime = this.endTime - this.startTime;
						this.totalTime += thisIntervalTime;
						this.intervals++;
						this.startTime = undefined;
						document.getElementsByTagName('body')[0].dispatchEvent(new CustomEvent('interval', {
							detail: {
								intervalTime: thisIntervalTime,
								intervalTitle: $(this.$el).find('.btn.btn-success').text()
							}
						}));
					}
				},

				cancelTimer: function(){
					if (!_.isUndefined(this.startTime)){
						this.startTime = undefined;
					}
				},

				timeFromSeconds: function(seconds){
					var hours,
						minutes;

					minutes = Math.floor(seconds / 60);
					seconds = seconds - minutes * 60;
					hours = Math.floor(minutes / 60);
					minutes = minutes - hours * 60;

					hours = String(hours);
					minutes = String(minutes);
					seconds = String(seconds);

					if (hours.length == 0){
						hours = '00';
					} else if (hours.length == 1){
						hours = '0' + hours;
					}

					if (minutes.length == 0){
						minutes = '00';
					} else if (minutes.length == 1){
						minutes = '0' + minutes;
					}

					if (seconds.length == 0){
						seconds = '00';
					} else if (seconds.length == 1){
						seconds = '0' + seconds;
					}

					return hours + ':' + minutes + ':' + seconds;
				}
			}
		});

		new Vue({
			el: '#timers'
		});
	}
}
