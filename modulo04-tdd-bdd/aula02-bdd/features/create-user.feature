Feature: Create Users API
  Background:
    Given I have a running server
    Given The current date is "2023-11-23T00:00"

  Scenario: Create a new user that is 23 years old and categorize them as young-adult
    When I create a new user with the following details:
      | name          | birthDay   |
      | Jhonny        | 2000-01-01 |

    Then I request the API with the user's ID
    Then I should receive a JSON response with the user's details
    Then The user's category should be "young-adult"

  Scenario: Error when creating a user who is younger than 18 years old
    When I create a young user with the following details:
      | name  | birthDay   |
      | Alice | 2005-01-01 |
    Then I should receive an error message that the user must be at least 18 years old

  # Scenario: Create an adult user
  #   Given I have a running server
  #   Given The current date is "2023-11-23T00:00"

  #   When I create a new user with the following details 2:
  #     | name     | birthDay   |
  #     | Jane     | 1980-01-01 |
  #   Then the user should be categorized as an "Adult"
  #   When I request the user with ID "2"
  #   Then I should receive a JSON response with the user's details
  #   And the user's category should be "Adult"

  # Scenario: Create a senior user
  #   Given I have a running server
  #   Given The current date is "2023-11-23T00:00"

  #   When I create a new user with the following details 3:
  #     | name     | birthDay   |
  #     | Bob      | 1950-01-01 |
  #   Then the user should be categorized as a "Senior"
  #   When I request the user with ID "3"
  #   Then I should receive a JSON response with the user's details
  #   And the user's category should be "Senior"

  # Scenario: Error when creating a user with an empty name
  #   Given I have a running server
  #   Given The current date is "2023-11-23T00:00"

  #   When I create a new user with the following details 4:
  #     | name  | birthDay   |
  #     |       | 1980-01-01 |
  #   Then I should receive an error message that the name cannot be empty

  # Scenario: Error when creating a user with an invalid birth date
  #   Given I have a running server
  #   Given The current date is "2023-11-23T00:00"

  #   When I create a new user with the following details 5:
  #     | name  | birthDay   |
  #     | Eve   | 2022-01-01 |
  #   Then I should receive an error message that the birth date is invalid
