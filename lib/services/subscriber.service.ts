import { prisma } from "@/lib/prisma";
import { SubscriberInput } from "@/lib/schemas/subscriber.schema";

export class SubscriberService {
  /**
   * Fetch all subscribers, ordered by newest first.
   */
  static async getAllSubscribers() {
    return prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Create a new subscriber.
   */
  static async createSubscriber(data: SubscriberInput) {
    return prisma.subscriber.create({
      data: {
        email: data.email,
        source: data.source || "Unknown",
      },
    });
  }

  /**
   * Update a subscriber's information.
   */
  static async updateSubscriber(id: string, data: Partial<SubscriberInput>) {
    return prisma.subscriber.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a subscriber.
   */
  static async deleteSubscriber(id: string) {
    return prisma.subscriber.delete({
      where: { id },
    });
  }

  /**
   * Get a single subscriber by ID.
   */
  static async getSubscriberById(id: string) {
    return prisma.subscriber.findUnique({
      where: { id },
    });
  }
}
