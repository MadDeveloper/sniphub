build:
ifeq ($(TRAVIS_BRANCH),production)
	ng build --prod
else
	ng build --prod --env=staging
endif
