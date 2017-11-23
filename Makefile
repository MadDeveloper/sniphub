build:
ifeq ($(TRAVIS_BRANCH),master)
	ng build --prod
else
	ng build --prod --env=staging
endif
