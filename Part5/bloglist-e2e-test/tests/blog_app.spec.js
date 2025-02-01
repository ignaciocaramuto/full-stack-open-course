import { test, expect, beforeEach, describe } from '@playwright/test'
import { createBlog, loginWith } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Ignacio Caramuto',
        username: 'ignaciocaramuto',
        password: '123456789'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'ignaciocaramuto', '123456789')

      await expect(page.getByText('Ignacio Caramuto logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'ignaciocaramuto', 'wrong')

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'ignaciocaramuto', '123456789')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'title', 'author', 'url')

      await expect(page.getByText(`A new blog title by author added`)).toBeVisible()
    })

    describe('and blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'title1', 'author1', 'url1')

        await page.waitForTimeout(500)

        await createBlog(page, 'title2', 'author2', 'url2')
      })

      test('a blog can be liked', async ({ page }) => {
        const blogElement = page.getByText('title1 author1').locator('..').locator('..')

        await blogElement.getByRole('button', { name: 'view' }).click()
        await blogElement.getByRole('button', { name: 'like' }).click()

        await expect(blogElement.getByText('likes: 1')).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        const blogElement = page.getByText('title2 author2').locator('..').locator('..')

        await blogElement.getByRole('button', { name: 'view' }).click()
        await blogElement.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('title2 author2')).not.toBeVisible()
      })

      test('blogs are arranged in the order acording to the likes', async ({ page }) => {
        const blogElement1 = page.getByText('title1 author1').locator('..').locator('..');
        const blogElement2 = page.getByText('title2 author2').locator('..').locator('..');

        await blogElement1.getByRole('button', { name: 'view' }).click();

        await blogElement2.getByRole('button', { name: 'view' }).click();


        await blogElement2.getByRole('button', { name: 'like' }).click();
        await blogElement2.getByRole('button', { name: 'like' }).click();
        await blogElement2.getByRole('button', { name: 'like' }).click();

        const likeElements = page.locator('.likes')

        const likesArray = [];
        for (let i = 0; i < 2; i++) {
          const like = likeElements.nth(i);
          const likeText = await like.textContent()
          const likeNumber = Number(likeText.split(":")[1].trim())
          likesArray.push(likeNumber);
        }

        const sortedLikesArray = [...likesArray].sort((a, b) => b - a);
        expect(likesArray).toEqual(sortedLikesArray);
      })
    })
  })
})
